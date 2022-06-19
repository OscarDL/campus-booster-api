import { Req, Res, Next, Resp } from '../../../types/express';
import * as GradeService from '../service/grade.service';
import * as TeacherService from '../../teachers/service/teacher.service';
import { ADMIN_ROLES } from '../../authorization/middlewares/auth.permission.middleware';
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

export async function getByTeacherFromUserId(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const teacherIds = (await TeacherService.findAll({
            where: {
                userId: req.params.user_id
            }
        })).map(teacher => teacher.id);

        const grades = [];
        for (const teacherId of teacherIds) {
            grades.push(...(await GradeService.findAll(
                {
                    where: {
                        teacherId
                    }
                },
                [
                    "withCourse",
                    "withUser",
                    "withTeacher"
                ]
            )));
        };

        return res.status(200).json([...new Set(grades.flat())]);
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        if (!ADMIN_ROLES.includes(req.user?.role ?? '')) {
            const teacher = await TeacherService.findOne({
                where: {
                    userId: req.user?.id,
                    classroomHasCourseId: req.body.classroomHasCourseId
                }
            });
            if (!teacher || teacher.id !== req.body.teacherId) {
                return next(boom.unauthorized("unauthorized"));
            }
        }

        const { id } = await GradeService.create(
            {
                average: req.body.average,
                comment: req.body.comment,
                userId: req.body.userId,
                classroomHasCourseId: req.body.classroomHasCourseId,
                teacherId: req.body.teacherId
            },
            [
                "withUser",
                "withCourse",
                "withTeacher"
            ]
        );
        const grade = await GradeService.findById(
            id,
            {},
            [
                "withUser",
                "withCourse",
                "withTeacher"
            ]
        );

        const user = grade?.User;
        const course = grade?.ClassroomHasCourse?.Course;

        if (course && user && req.body.average >= 10) {
            await user.increment('credits', {
                by: course.credits ?? 0,
                where: { id: user.id }
            });
        }

        return res.status(201).json(grade);
    } catch (err: any) {
        console.log(err);
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const grade = await GradeService.findById(
            req.params.grade_id,
            {},
            [
                "withUser",
                "withCourse",
                "withTeacher"
            ]
        );

        // Do not allow grade update if the user is not the grade teacher or an admin 
        if (!grade || (!ADMIN_ROLES.includes(req.user?.role ?? '') && grade.Teacher?.userId !== req.user?.id)) {
            return next(boom.unauthorized("unauthorized"));
        }

        await GradeService.update(req.params.grade_id, req.body);
        const course = grade?.ClassroomHasCourse?.Course;
        const user = grade?.User;

        if (course && user && grade?.average && req.body.average) {
            if (req.body.average >= 10 && grade.average < 10) {
                await user.increment('credits', {
                    by: course.credits ?? 0,
                    where: { id: user.id }
                });
            }
            if (grade.average >= 10 && req.body.average < 10) {
                await user.decrement('credits', {
                    by: course.credits ?? 0,
                    where: { id: user.id }
                });
            }
        }

        return res.status(203).json(
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

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const grade = await GradeService.findById(
            req.params.grade_id,
            {},
            [
                "withUser",
                "withCourse",
                "withTeacher"
            ]
        );

        const course = grade?.ClassroomHasCourse?.Course;
        const user = grade?.User;

        if (course && user && grade?.average) {
            if (grade.average >= 10) {
                await user.decrement('credits', {
                    by: course.credits ?? 0,
                    where: { id: user.id }
                });
            }
        }

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