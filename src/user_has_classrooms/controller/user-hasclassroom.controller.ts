import { Req, Res, Next, Resp } from '../../../types/express';
import * as UserHasClassroomService from '../service/user-hasclassroom.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await UserHasClassroomService.findById(
                req.params.userhasclassroom_id
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
            await UserHasClassroomService.findAll(
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
        const userhasclassroom = await UserHasClassroomService.create(req.body as any);
        return res.status(201).json(
            await UserHasClassroomService.findById(userhasclassroom.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const userhasclassroom = await UserHasClassroomService.update(
            req.params.userhasclassroom_id, 
            req.body
        );
        return res.status(203).json(
            await UserHasClassroomService.findById(userhasclassroom.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await UserHasClassroomService.remove(
                {
                    where: {
                        id: req.params.userhasclassroom_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}