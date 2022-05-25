import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findAll, findById } from '../service/teacher.service';

export function teacherExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const teacher = await findById(req.query[name]);
                return (!teacher) ? next(boom.badRequest(`resource_not_found`, [ "Teacher", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function teacherExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const teacher = await findById(req.body[name]);
                return (!teacher) ? next(boom.badRequest(`resource_not_found`, [ "Teacher", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function teacherExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const teacher = await findById(req.params[name]);
                return (!teacher) ? next(boom.badRequest(`resource_not_found`, [ "Teacher", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function teacherIsInClassroom(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        if(req.body.classroomHasCourseId && req.body.teacherId) {
            const teacher = await findById(req.body.teacherId, {}, "withClassroom");
            return (teacher?.classroomHasCourseId === req.body.classroomHasCourseId) ? next() :
            next(boom.badRequest('missing_access_rights'));
        }
        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}
