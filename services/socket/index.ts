import config from '../../config/env.config';
import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import { ReqJWT } from '../../types/express';
import { IServer, ISocket } from '../../types/socket';
const { permissionLevel } = config;
import * as UserService from '../../src/users/service/user.service';

/**
 * This socket.io middleware enable security auth to client sockets. 
 * @param io - Socket.io server
 * @return void
 */
export function authSocketMidddleware (io: IServer): void {
    io.use( async (socket: ISocket, next) => {
        try {
            const token = socket.handshake.auth?.token?.split(' ') || [];
            if (token[0] !== 'Bearer') {
                return next(boom.badRequest('bearer_missing'));
            } else {
                try {
                    socket.jwt = jwt.verify(
                        token[1],
                        config.jwtSecret,
                        config.jwtOptions as object
                    ) as ReqJWT;
                    socket.user = await UserService.findById(socket.jwt?.id, {}, 'all');
                    if(
                        socket.user && 
                        socket.user.active &&
                        socket.user.role
                    ) {
                        socket.isAdmin = [
                            permissionLevel.CampusManager,
                            permissionLevel.CampusBoosterAdmin
                        ].includes(socket.user.role);
                        socket.connected = true;
                        return next();
                    } else {
                        socket.connected = false;
                        return next(boom.unauthorized('unauthorized'));
                    }
                } catch (err: any) {
                    console.log(`${err}`.error);
                    return next(boom.unauthorized(err));
                }
            }
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(boom.badRequest(err));
        }
    });
}
