import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById, findOne } from '../service/absence.service';
import config from '../../../config/env.config';
const {
  permissionLevel: { Student }
} = config;

export function absenceExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const absence = await findById(req.query[name]);
                return (!absence) ? next(boom.notFound(`resource_not_found`, [ "Absence", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function absenceExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const absence = await findById(req.body[name]);
                return (!absence) ? next(boom.notFound(`resource_not_found`, [ "Absence", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function absenceExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const absence = await findById(req.params[name]);
                return (!absence) ? next(boom.notFound(`resource_not_found`, [ "Absence", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function isMyAbsenceOrIamAdmin(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return req.isAdmin ? next() : await findOne({
            where: {
                id: req.params.absence_id,
                userId: req.user?.id
            }
        }) ? next() : next(boom.badRequest('missing_access_rights'));
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    } 
}

export async function studentIsUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        if (req.isAdmin) return next();
        return req.user?.id === req.body.userId ? next() : next(boom.badRequest('absence_user_create_different'));
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    } 
}

export async function formatBodyParameters(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const data = JSON.parse(req.body.data);

        // numbers
        if (typeof data.userId !== 'number') {
          return next(next(boom.badRequest(`body_format`, [ 'userId', 'integer' ])));
        }
        if (typeof data.planningId !== 'number') {
          return next(next(boom.badRequest(`body_format`, [ 'planningId', 'integer' ])));
        }
        req.body.userId = data.userId;
        req.body.planningId = data.planningId;

        // booleans
        if (typeof data.late !== 'boolean') {
          return next(next(boom.badRequest(`body_format`, [ 'late', 'boolean' ])));
        }
        req.body.late = data.late;

        // strings
        if (typeof data.period !== 'string') {
          return next(next(boom.badRequest(`body_format`, [ 'period', 'string' ])));
        }
        if (typeof data.reason !== 'string') {
          return next(next(boom.badRequest(`body_format`, [ 'reason', 'string' ])));
        }
        req.body.period = data.period;
        req.body.reason = data.reason;

        req.body.fileKeys = data.fileKeys ?? [];
        next();

    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    } 
}