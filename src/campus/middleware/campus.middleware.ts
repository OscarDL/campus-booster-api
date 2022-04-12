import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/campus.service';

export function campusExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const campus = await findById(req.query[name]);
                return (!campus) ? next(boom.badRequest(`Campus does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function campusExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const campus = await findById(req.body[name]);
                return (!campus) ? next(boom.badRequest(`Campus does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function campusExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const campus = await findById(req.params[name]);
                return (!campus) ? next(boom.badRequest(`Campus does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}