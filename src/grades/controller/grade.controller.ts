import { Req, Res, Next, Resp } from '../../../types/express';
import * as GradeService from '../service/grade.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await GradeService.findById(
                req.params.grade_id,
                {},
                [
                    "withUser",
                    "withCourse",
                    "withTeacher"
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
            await GradeService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset
                },
                [
                    "withUser",
                    "withCourse",
                    "withTeacher"
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
            await GradeService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        userId: req.params.user_id
                    }
                },
                [
                    "withCourse",
                    "withTeacher"
                ]
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getByTeacher(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await GradeService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        teacherId: req.params.teacher_id
                    }
                } as any,
                [
                    "withCourse",
                    "withUser",
                    "withTeacher"
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
        const grade = await GradeService.create(
            {
                average: req.body.average,
                comment: req.body.comment,
                userId: req.body.userId,
                classroomHasCourseId: req.body.classroomHasCourseId,
                teacherId: req.body.teacherId
            }
        );
        return res.status(201).json(
            await GradeService.findById(
                grade.id,
                {},
                [
                    "withUser",
                    "withCourse",
                    "withTeacher"
                ]
            )
        );
    } catch (err: any) {
        console.log(err);
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const grade = await GradeService.update(
            req.params.grade_id, 
            req.body
        );
        return res.status(203).json(
            await GradeService.findById(
                grade.id,
                {},
                [
                    "withUser",
                    "withCourse",
                    "withTeacher"
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
            await GradeService.remove(
                {
                    where: {
                        id: req.params.grade_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}