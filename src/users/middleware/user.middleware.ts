import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById, findOne } from '../service/user.service';
import * as CampusService from '../../campus/service/campus.service';
import config from "../../../config/env.config";
const {
    permissionLevel: { CampusManager, Student },
    app_domain
} = config;

export function userExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const user = await findById(req.query[name]);
                return (!user) ? next(boom.badRequest(`resource_not_found`, [ "User", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function userExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const user = await findById(req.body[name]);
                return (!user) ? next(boom.badRequest(`resource_not_found`, [ "User", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function userExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const user = await findById(req.params[name]);
                return (!user) ? next(boom.badRequest(`resource_not_found`, [ "User", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function emailIsNotTaken(req: Req, res: Res, next: Next): Promise<Resp> {
    if (!req.body.email) return next();

    try {
        const user = await findOne({where: { email: req.body.email }});

        // Check only if email is taken by someone else
        if (user?.id) {
            if (user.email !== req.body.email) {
                return next(boom.conflict('email_taken', req.body.email));
            }
            return next();
        }

        return user ? next(boom.conflict('email_taken', req.body.email)) : next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function personalEmailIsNotTaken(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        if(req.body.personalEmail) {
            return (
                await findOne({
                    where: {
                        personalEmail: req.body.personalEmail 
                    }
                }) ? next(boom.conflict('email_taken', req.body.personalEmail)) : next()        
            );
        }
        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function iamAdminOrItsaStudent(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return req.isAdmin ? next() : 
            (await findById(req.params.user_id))?.role === Student ? 
        next() : next(boom.badRequest('missing_access_rights'));
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function campusManagerIsNotTaken(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        if(req.body.user?.role === CampusManager) {
            const campus = await CampusService.findById(req.body.user?.campusId);
            if (campus?.CampusManager) {
                return next(boom.conflict('campus_manager_taken', campus.name));
            }
        }
        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function dontDeleteYourself(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return Number(req.params?.user_id) === req.user?.id ? 
        next(boom.badRequest('missing_access_rights')): next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function userIsInClassroom(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        if(req.body.userId && req.body.classroomHasCourseId) {
            const user = await findById(req.body.userId, {}, "withClassrooms");
            const IDs = user?.UserHasClassrooms?.map(u => u.Classroom?.ClassroomHasCourses?.map(c => c?.id))?.flat();
            return (IDs?.includes(req.body.classroomHasCourseId)) ? 
            next() : next(boom.badRequest('missing_access_rights'));
        }
        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}