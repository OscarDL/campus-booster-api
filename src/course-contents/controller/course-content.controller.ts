import { Req, Res, Next, Resp } from '../../../types/express';
import * as CourseContentService from '../service/course-content.service';
import boom from '@hapi/boom';

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await CourseContentService.findById(
                req.params.course_content_id
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
            await CourseContentService.findAll(
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
        const courseContent = await CourseContentService.create(
            {
                name: req.body.name,
                link: req.body.link,
                courseId: req.body.courseId,
                availability: req.body.availability
            }
        );
        return res.status(201).json(
            await CourseContentService.findById(courseContent.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const courseContent = await CourseContentService.update(
            req.params.course_content_id,
            {
                name: req.body.name,
                link: req.body.link,
                courseId: req.body.courseId,
                availability: req.body.availability
            }
        );
        return res.status(203).json(
            await CourseContentService.findById(courseContent.id)
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        return res.status(204).json(
            await CourseContentService.remove(
                {
                    where: {
                        id: req.params.course_content_id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}