import { Req, Res, Next, Resp } from '../../../types/express';
import * as AbsenceService from '../service/absence.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await AbsenceService.findById(
                req.params.absence_id,
                {},
                [
                    "withPlanning",
                    "withUser"
                ]
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
            await AbsenceService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset
                },
                [
                    "withPlanning",
                    "withUser"
                ]
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getByUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await AbsenceService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        userId:req.params.user_id
                    }
                },
                [
                    "withPlanning",
                    "withUser"
                ]
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        if(req.files && req.files.length > 0) {
            req.body.fileKeys = Object.entries(req.files).map(([_, value]) => (value as any).key);
            console.log(req.body.fileKeys, req.files);
        }
        
        const absence = await AbsenceService.create(
            Object.assign(
                req.body,
                {
                    userId: req.user?.id
                }
            )
        );
        return res.status(203).json(
            await AbsenceService.findById(
                absence.id,
                {},
                [
                    "withPlanning",
                    "withUser"
                ]
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        let absence = await AbsenceService.findById(req.params.absence_id);
        const rmFileKeys = absence?.fileKeys?.filter(f => !req.body.fileKeys.includes(f)) ?? [];
        for (let i = 0; i < rmFileKeys.length; i++) {
            const fileKey = rmFileKeys[i];
            await s3.remove(fileKey);
        }
        if(req.files) {
            req.body.fileKeys.concat(Object.entries(req.files).map(([_, value]) => (value as any).key));
        }

        absence = await AbsenceService.update(req.params.absence_id, req.body);
        return res.status(203).json(
            await AbsenceService.findById(
                absence.id,
                {},
                [
                    "withPlanning",
                    "withUser"
                ]
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const absence = await AbsenceService.findById(req.params.absence_id); 
        for (let i = 0; i < absence?.fileKeys?.length!; i++) {
            if(absence?.fileKeys) {
                const fileKeys = absence?.fileKeys[i];
                await s3.remove(fileKeys);
            }
        }
        return res.status(204).json(
            await AbsenceService.remove(
                {
                    where: {
                        id: absence?.id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}