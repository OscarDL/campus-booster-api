import config from '../../config/env.config';
import jwt from 'jsonwebtoken';
import boom from '@hapi/boom';
import { ReqJWT } from '../../types/express';
import { IServer, ISocket } from '../../types/socket';
const { permissionLevel } = config;

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
                return next(boom.badRequest('You need to provide a Bearer token'));
            } else {
                try {
                    socket.jwt = jwt.verify(
                        token[1],
                        config.jwtSecret,
                        config.jwtOptions as object
                    ) as ReqJWT;
                    //socket.user = await UserService.findById(socket.jwt?.id, {}, 'all');
                    if(
                        socket.user && 
                        socket.user.is_validate &&
                        socket.user.role
                    ) {
                        socket.isAdmin = [
                            permissionLevel.Admin,
                            permissionLevel.Boss
                        ].includes(socket.user.role);
                        socket.connected = true;
                        return next();
                    } else {
                        socket.connected = false;
                        return next(boom.unauthorized('Unauthorize.'));
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

/**
 * Get socket ID by user ID
 * @param io - Socket.io server
 * @param userIDs - The id(s) of user(s)
 * @return string[]
 */
export function getSocketIdByUserId (io: IServer, userIDs: (string | undefined)[]): (string[] | null) {
    const sockets = Array.from(io.sockets.sockets.values()) as ISocket[];
    const ids = sockets.filter(s => s?.connected && userIDs.includes(s?.user?.id!)).map(s => s.id);
    return ids.length ? ids : null;
}

/**
 * Get all sockets connected except my socket(s).
 * @param io - Socket.io server
 * @param user_id - Your user ID
 * @return string[]
 */
export function getAllSocketIdsExceptMe(io: IServer, user_id: string | undefined): (string[] | null) {
    const sockets = Array.from(io.sockets.sockets.values()) as ISocket[];
    const ids = sockets.filter(s => s.connected && s.user?.id !== user_id).map(s => s.id);
    return user_id && ids.length ? ids : null;
}

/**
 * Get all sockets connected except my socket(s).
 * @param io - Socket.io server
 * @param socket - The socket.io client
 * @return number[]
 */
export function getAllUserIdsExpectMe(io: IServer, socket: ISocket): (string | undefined)[] {
    const sockets = Array.from(io.sockets.sockets.values()) as ISocket[];
    return sockets.map(s => s.user?.id).filter(id => id !== socket.user?.id);
}