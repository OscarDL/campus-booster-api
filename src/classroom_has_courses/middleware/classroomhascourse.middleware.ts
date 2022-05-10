import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/classroomhascourse.service';

export function classroomhascourseExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const classroomhascourse = await findById(req.query[name]);
                return (!classroomhascourse) ? next(boom.badRequest(`ClassroomHasCourse_not_found`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function classroomhascourseExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const classroomhascourse = await findById(req.body[name]);
                return (!classroomhascourse) ? next(boom.badRequest(`ClassroomHasCourse_not_found`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function classroomhascourseExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const classroomhascourse = await findById(req.params[name]);
                return (!classroomhascourse) ? next(boom.badRequest(`ClassroomHasCourse_not_found`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}