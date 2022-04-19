import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/attendance.service';

export function attendanceExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const attendance = await findById(req.query[name]);
                return (!attendance) ? next(boom.badRequest(`Attendance does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function attendanceExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const attendance = await findById(req.body[name]);
                return (!attendance) ? next(boom.badRequest(`Attendance does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function attendanceExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const attendance = await findById(req.params[name]);
                return (!attendance) ? next(boom.badRequest(`Attendance does not exist!`)) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}