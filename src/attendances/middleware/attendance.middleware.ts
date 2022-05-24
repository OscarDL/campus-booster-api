import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById, findOne } from '../service/attendance.service';

export function attendanceExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const attendance = await findById(req.query[name]);
                return (!attendance) ? next(boom.badRequest(`resource_not_found`, [ "Attendance", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function attendanceExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const attendance = await findById(req.body[name]);
                return (!attendance) ? next(boom.badRequest(`resource_not_found`, [ "Attendance", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function attendanceExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const attendance = await findById(req.params[name]);
                return (!attendance) ? next(boom.badRequest(`resource_not_found`, [ "Attendance", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function isMyAttendanceOrIamAdmin(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return req.isAdmin ? next() : await findOne({
            where: {
                id: req.params.attendance_id,
                userId: req.user?.id
            }
        }) ? next() : next(boom.badRequest('missing_access_rights'));
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    } 
}