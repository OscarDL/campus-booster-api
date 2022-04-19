import { Req, Res, Next, Resp } from '../../../types/express';
import * as AttendanceService from '../service/attendance.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await AttendanceService.findById(
                req.params.attendance_id
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getAll(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await AttendanceService.findAll(
                {
                    limit: req.query?.limit
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(201).json(
            await AttendanceService.create(
                req.body as any
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(203).json(
            await AttendanceService.update(
                req.params.attendance_id, 
                req.body
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await AttendanceService.remove(
                {
                    where: {
                        id: req.params.attendance_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}