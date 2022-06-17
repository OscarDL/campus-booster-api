import { Req, Res, Next, Resp } from '../../../types/express';
import * as PlanningService from '../service/planning.service';
import * as UserService from '../../users/service/user.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await PlanningService.findById(
                req.params.planning_id
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
            await PlanningService.findAll(
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

export async function getByUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const user = await UserService.findById(req.params?.user_id, {}, 'withClassrooms');
        if(!user) return next(boom.notFound('resource_not_found', ['user', req.params?.user_id]));

        return res.status(200).json(
          (await PlanningService.findAll(
              {
                  limit: req.query?.limit
              }
          )).filter(planning => (
              user.UserHasClassrooms?.map(uhc => uhc.classroomId).includes(planning.ClassroomHasCourse?.classroomId)
          ))
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getByClass(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            (await PlanningService.findAll(
                {
                    limit: req.query?.limit
                }
            )).filter(planning => (
                planning.ClassroomHasCourse?.classroomId === Number(req.params.classroom_id)
            ))
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const planning = await PlanningService.create(req.body as any);
        return res.status(201).json(
            await PlanningService.findById(planning.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const planning = await PlanningService.update(req.params.planning_id, req.body);
        return res.status(203).json(
            await PlanningService.findById(planning.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await PlanningService.remove(
                {
                    where: {
                        id: req.params.planning_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}