import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/balance-status.service';

export function balancestatusExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const balancestatus = await findById(req.query[name]);
                return (!balancestatus) ? next(boom.badRequest(`BalanceStatus does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function balancestatusExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const balancestatus = await findById(req.body[name]);
                return (!balancestatus) ? next(boom.badRequest(`BalanceStatus does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function balancestatusExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const balancestatus = await findById(req.params[name]);
                return (!balancestatus) ? next(boom.badRequest(`BalanceStatus does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}