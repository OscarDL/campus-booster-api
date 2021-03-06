import { Req, Res, Next, Resp } from '../../../types/express';
import * as TeacherService from '../service/teacher.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await TeacherService.findById(
                req.params.teacher_id,
                {},
                [
                    "defaultScope",
                    "withClassroom"
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
            (await TeacherService.findAll(
                {
                    limit: req.query?.limit
                },
                [
                    "defaultScope",
                    "withClassroom"
                ]
            )).filter(teacher => !req.user?.campusId ? true : teacher.ClassroomHasCourse?.Classroom?.campusId === req.user.campusId)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const existingTeacher = await TeacherService.findOne({
            where: {
                userId: req.body.userId,
                classroomHasCourseId: req.body.classroomHasCourseId
            }
        });

        if (existingTeacher) return next(boom.conflict('teacher_classroom_exists'));

        const teacher = await TeacherService.create(req.body);

        return res.status(201).json(
            await TeacherService.findById(
                teacher.id,
                {},
                [
                    "defaultScope",
                    "withClassroom"
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
        const existingTeacher = await TeacherService.findOne({
            where: {
                userId: req.body.userId,
                classroomHasCourseId: req.body.classroomHasCourseId
            }
        });

        if (existingTeacher) return next(boom.conflict('teacher_classroom_exists'));

        const teacher = await TeacherService.update(req.params.teacher_id, req.body);

        return res.status(203).json(
            await TeacherService.findById(
                teacher.id,
                {},
                [
                    "defaultScope",
                    "withClassroom"
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
            await TeacherService.remove(
                {
                    where: {
                        id: req.params.teacher_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}