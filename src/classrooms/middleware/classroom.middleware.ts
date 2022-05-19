import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { findById } from '../service/classroom.service';
import * as Userservice from '../../users/service/user.service';
import * as UserHasClassroomService from '../../user_has_classrooms/service/user-hasclassroom.service';

export function classroomExistAsQuery(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.query[name]) {
                const classroom = await findById(req.query[name]);
                return (!classroom) ? next(boom.badRequest(`resource_not_found`, [ "Classroom", req.query[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function classroomExistAsBody(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.body[name]) {
                const classroom = await findById(req.body[name]);
                return (!classroom) ? next(boom.badRequest(`resource_not_found`, [ "Classroom", req.body[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export function classroomExistAsParam(name: string): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(req.params[name]) { 
                const classroom = await findById(req.params[name]);
                return (!classroom) ? next(boom.badRequest(`resource_not_found`, [ "Classroom", req.params[name]])) : next();
            }
            return next();
        } catch (err: any) {
            console.log(`${err}`.red.bold);
            return next(err.isBoom ? err : boom.internal(err.name));
        }
    }
}

export async function classroomCanBeLinkedToUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const userHasClassrooms = await UserHasClassroomService.findAll({
            where: {
                userId: req.params.user_id
            }
        });
        const classrooms = [ ...new Set(req.body.classrooms) ];
        for (let i = 0; i < classrooms?.length; i++) {
            const id = classrooms[i];
            if(typeof id === "number") {
                const classroom = await findById(id);
                if(!classroom) {
                    return next(boom.badRequest(`resource_not_found`, [ "Classroom", id]));
                }
                const user = await Userservice.findById(req.params.user_id);
                if(classroom.campusId && user?.campusId !== classroom.campusId) {
                    return next(boom.badRequest(`user_invalid_campus`, [ `${user?.firstName} ${user?.lastName}`, classroom?.Campus?.name]));
                }
                if(userHasClassrooms.some(m => m.classroomId === id)) {
                    return next(boom.badRequest(`user_already_in_classroom`, [ `${user?.firstName} ${user?.lastName}`, `${classroom?.name} ${classroom?.promotion}`]));
                }
            } else {
                return next(boom.badRequest(`param_format`, [ "classrooms", "Array<string>" ])); 
            }
        }
        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function classroomCanBeUnLinkedFromUser(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const userHasClassrooms = await UserHasClassroomService.findAll({
            where: {
                userId: req.params.user_id
            }
        });
        const classrooms = [ ...new Set(req.body.classrooms) ];
        for (let i = 0; i < classrooms?.length; i++) {
            const id = classrooms[i];
            if(typeof id === "number") {
                const classroom = await findById(id);
                if(!classroom) {
                    return next(boom.badRequest(`resource_not_found`, [ "Classroom", id]));
                }
                const user = await Userservice.findById(req.params.user_id);
                if(!userHasClassrooms.some(m => m.classroomId === id)) {
                    return next(boom.badRequest(`user_not_in_classroom`, [ `${user?.firstName} ${user?.lastName}`, `${classroom?.name} ${classroom?.promotion}`]));
                }
            } else {
                return next(boom.badRequest(`param_format`, [ "classrooms", "Array<string>" ])); 
            }
        }
        return next();
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}