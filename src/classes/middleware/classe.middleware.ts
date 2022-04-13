import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/classe.service';

export function classeExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const classe = await findById(req.query[name]);
                return (!classe) ? next(boom.badRequest(`class_not_found`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function classeExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const classe = await findById(req.body[name]);
                return (!classe) ? next(boom.badRequest(`class_not_found`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function classeExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const classe = await findById(req.params[name]);
                return (!classe) ? next(boom.badRequest(`class_not_found`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}