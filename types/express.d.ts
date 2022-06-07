import { Request, Response, NextFunction, Application } from 'express';
import { UserModel } from '../src/users/model/user.interface';
import boom from '@hapi/boom';
import { IServer } from './socket';

type Dictionary = ({ [k: string]: any; });
export interface Req<Q=Dictionary, B=Dictionary> extends Request {
    user?: (UserModel | null);
    query: Q;
    body: B;
    isAdmin?: boolean;
    jwt?: ReqJWT;
};

export interface ReqJWT {
    id?: number;
    refreshKey?: any;
    iat?: number;
    exp?: number;
};

export interface Res extends Response { io?: IServer; };
export interface Next extends NextFunction { (err: boom.Boom<any>): void; };
export type Resp = Response | void;
export interface App extends Application {};
export type Fn<Q=Dictionary, B=Dictionary> = (req: Req<Q, B>, res: Res, next: Next) => Resp;
export type AsyncFn<Q=Dictionary, B=Dictionary> = (req: Req<Q, B>, res: Res, next: Next) => Promise<Resp>;