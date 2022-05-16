import { Req, Res, Next, Resp } from '../../../types/express';
import * as AttendanceService from '../service/attendance.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await AttendanceService.findById(
                req.params.attendance_id
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
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
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        if(req.files) {
            req.body.fileKeys = Object.entries(req.files).map(([_, value]) => (value as any).key);
            console.log(req.body.fileKeys, req.files);
        }
        return res.status(201).json(
            await AttendanceService.create(
                Object.assign(
                    req.body,
                    {
                        userId: req.user?.id
                    }
                )
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const attendance = await AttendanceService.findById(req.params.attendance_id); 
        const rmFileKeys = attendance?.fileKeys?.filter(f => !req.body.fileKeys.includes(f)) ?? [];
        for (let i = 0; i < rmFileKeys.length; i++) {
            const fileKey = rmFileKeys[i];
            await s3.remove(fileKey);
        }
        if(req.files) {
            req.body.fileKeys.push(Object.entries(req.files).map(([_, value]) => (value as any).key));
        }
        return res.status(203).json(
            await AttendanceService.update(
                req.params.attendance_id, 
                req.body
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const attendance = await AttendanceService.findById(req.params.attendance_id); 
        for (let i = 0; i < attendance?.fileKeys?.length!; i++) {
            if(attendance?.fileKeys) {
                const fileKeys = attendance?.fileKeys[i];
                await s3.remove(fileKeys);
            }
        }
        return res.status(204).json(
            await AttendanceService.remove(
                {
                    where: {
                        id: attendance?.id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}