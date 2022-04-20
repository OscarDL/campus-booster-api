import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/user-hasclassroom.service';

export function userhasclassroomExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const userhasclassroom = await findById(req.query[name]);
                return (!userhasclassroom) ? next(boom.badRequest(`UserHasClassroom does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function userhasclassroomExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const userhasclassroom = await findById(req.body[name]);
                return (!userhasclassroom) ? next(boom.badRequest(`UserHasClassroom does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function userhasclassroomExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const userhasclassroom = await findById(req.params[name]);
                return (!userhasclassroom) ? next(boom.badRequest(`UserHasClassroom does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}