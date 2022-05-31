import { Req, Res, Next, Resp } from '../../../types/express';
import * as ClassroomService from '../service/classroom.service';
import * as ClassroomHasCourseService from '../../classroom_has_courses/service/classroomhascourse.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ClassroomService.findById(
                req.params.classroom_id
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
            await ClassroomService.findAll(
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

export async function getMine(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await ClassroomService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        '$UserHasClassrooms.user_id$': req.params.user_id 
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function addCoursesToClassroom(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const courses = [ ...new Set(req.body.courses) ] as number[];
        for (let i = 0; i < courses?.length; i++) {
            const id = courses[i];
            await ClassroomHasCourseService.create({
                courseId: id,
                classroomId: parseInt(req.params.classroom_id)
            });
        }
        return res.status(201).json(
            await ClassroomService.findById(req.params.classroom_id)
        );
    } catch (err: any) {
        console.log(err);
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function removeCoursesFromClassroom(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const courses = [ ...new Set(req.body.courses) ] as number[];
        for (let i = 0; i < courses?.length; i++) {
            const id = courses[i];
            await ClassroomHasCourseService.remove({
                where: { 
                    courseId: id,
                    classroomId: parseInt(req.params.classroom_id)
                }
            });
        }
        return res.status(201).json(
            await ClassroomService.findById(req.params.classroom_id)
        );
    } catch (err: any) {
        console.log(err);
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const classroom = await ClassroomService.create(
            {
                promotion: req.body.promotion,
                campusId: req.body.campusId,
                name: req.body.name
            }
        );
        return res.status(201).json(
            await ClassroomService.findById(classroom?.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const classroom = await ClassroomService.update(
            req.params.classroom_id, 
            req.body
        );
        return res.status(203).json(
            await ClassroomService.findById(classroom?.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await ClassroomService.remove(
                {
                    where: {
                        id: req.params.classroom_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}