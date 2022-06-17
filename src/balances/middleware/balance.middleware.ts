import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/balance.service';
import * as UserService from '../../users/service/user.service';
import config from "../../../config/env.config";
const {
    permissionLevel: { Student }
} = config;

export function balanceExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const balance = await findById(req.query[name]);
                return (!balance) ? next(boom.badRequest(`resource_not_found`, [ "Balance", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function balanceExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const balance = await findById(req.body[name]);
                return (!balance) ? next(boom.badRequest(`resource_not_found`, [ "Balance", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function balanceExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const balance = await findById(req.params[name]);
                return (!balance) ? next(boom.badRequest(`resource_not_found`, [ "Balance", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function userIsStudent(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const user = await UserService.findById(req.body.userId);

        if(!user || user.role !== Student) { 
          return next(boom.badRequest('balance_user_is_not_student'));
        }

        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}