import { Socket, Server } from 'socket.io';
import { UserModel } from '../src/users/model/user.interface';
import { ReqJWT } from './express';
export interface ISocket extends Socket {
    user?: (UserModel | null);
    jwt?: ReqJWT;
    connected?: boolean;
    isAdmin?: boolean;
}
export interface IServer extends Server {}