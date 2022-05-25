import { Req, Res, Next, Resp } from '../../../types/express';
import * as CourseService from '../service/course.service';
import * as UserService from '../../users/service/user.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await CourseService.findById(
                req.params.course_id,
                {},
                [
                    "withClassroomHasCourse",
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
            await CourseService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset,
                    where: {
                        '$ClassroomHasCourses.Classroom.UserHasClassrooms.user_id$': req.params.user_id
                    }
                } as any,
                [
                    "withClassroomHasCourse",
                    "withUser",
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
            await CourseService.findAll(
                {
                    limit: req.query?.limit,
                    offset: req.query?.offset
                },
                [
                    "withClassroomHasCourse",
                    "withUser",
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
        const course = await CourseService.create(
            {
                name: req.body.name,
                description: req.body.description,
                link: req.body.link,
                credits: req.body.credits,
                year: req.body.year,
                speciality: req.body.speciality,
            }
        );
        return res.status(201).json(
            await CourseService.findOne(
                {
                    where: {
                        id: course.id
                    }
                },
                [
                    "withClassroomHasCourse",
                    "withUser",
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
        const course = await CourseService.update(
            req.params.course_id,
            {
                
                name: req.body.name,
                description: req.body.description,
                link: req.body.link,
                credits: req.body.credits,
                year: req.body.year,
                speciality: req.body.speciality,
            }
        );
        return res.status(203).json(
            await CourseService.findOne(
                {
                    where: {
                        id: course.id
                    }
                },
                [
                    "withClassroomHasCourse",
                    "withUser",
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
            await CourseService.remove(
                {
                    where: {
                        id: req.params.course_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}