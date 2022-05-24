import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById, findOne } from '../service/grade.service';

export function gradeExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const grade = await findById(req.query[name]);
                return (!grade) ? next(boom.badRequest(`resource_not_found`, [ "Grade", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function gradeExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const grade = await findById(req.body[name]);
                return (!grade) ? next(boom.badRequest(`resource_not_found`, [ "Grade", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function gradeExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const grade = await findById(req.params[name]);
                return (!grade) ? next(boom.badRequest(`resource_not_found`, [ "Grade", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function isMyGradeOrIamAdmin(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return req.isAdmin ? next() : await findOne({
            where: {
                id: req.params.grade_id,
                userId: req.user?.id
            }
        }) ? next() : next(boom.badRequest('missing_access_rights'));
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    } 
}