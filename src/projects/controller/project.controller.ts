import { Req, Res, Next, Resp } from '../../../types/express';
import * as ProjectService from '../service/project.service';
import * as UserService from '../../users/service/user.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ProjectService.findById(
                req.params.project_id,
                {},
                [
                    "withClassroomHasCourse"
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
            await ProjectService.findAll(
                {
                    limit: req.query?.limit
                },
                [
                    "withClassroomHasCourse"
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
        const user = await UserService.findById(req.params?.user_id, {}, 'withClassrooms');
        if(!user) return next(boom.badRequest('resource_not_found', ['user', req.params?.user_id]));

        return res.status(200).json(
          (await ProjectService.findAll(
              {
                  limit: req.query?.limit
              },
              [
                  // "withUser",
                  "withClassroomHasCourse"
              ]
          )).filter(project => (
              user.UserHasClassrooms?.map(uhc => uhc.classroomId).includes(project.ClassroomHasCourse?.classroomId)
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
            (await ProjectService.findAll(
                {
                    limit: req.query?.limit
                },
                [
                    "withClassroomHasCourse"
                ]
            )).filter(project => (
                project.ClassroomHasCourse?.classroomId === Number(req.params.classroom_id)
            ))
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const project = await ProjectService.create(req.body as any);
        return res.status(201).json(
            await ProjectService.findById(
                project.id,
                {},
                [
                    "withClassroomHasCourse"
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
        const project = await ProjectService.update(req.params.project_id, req.body);
        return res.status(203).json(
            await ProjectService.findById(
                project.id,
                {},
                [
                    "withClassroomHasCourse"
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
            await ProjectService.remove(
                {
                    where: {
                        id: req.params.project_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}