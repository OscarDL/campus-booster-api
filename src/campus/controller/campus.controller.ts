import { Req, Res, Next, Resp } from '../../../types/express';
import * as CampusService from '../service/campus.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await CampusService.findById(
                req.params.campusId,
                {},
                [
                    "withClassrooms",
                    "withUsers"
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
            await CampusService.findAll(
                {
                    limit: req.query?.limit
                },
                [
                    "withClassrooms",
                    "withUsers"
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
        const campus = await CampusService.create(
            req.body as any
        );
        return res.status(201).json(
            await CampusService.findById(
                campus?.id,
                {},
                [
                    "withClassrooms",
                    "withUsers"
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
        const campus = await CampusService.update(
            req.params.campusId, 
            req.body
        );
        return res.status(203).json(
            await CampusService.findById(
                campus?.id,
                {},
                [
                    "withClassrooms",
                    "withUsers"
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
        return res.status(204).json(
            await CampusService.remove(
                {
                    where: {
                        id: req.params.campusId
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}