import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ClassroomHasCourseController from './controller/classroomhascourse.controller';
import * as ClassroomHasCourseMiddleware from './middleware/classroomhascourse.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/classroomhascourses';

export default (app: App): void => {
    // GET ALL CLASSROOMHASCOURSES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		ClassroomHasCourseController.getAll
    ]);
    // GET CLASSROOMHASCOURSE BY ID
    app.get(`${routePrefix}/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.getById
    ]);
    // CREATE A NEW CLASSROOMHASCOURSE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		ClassroomHasCourseController.create
    ]);
    // UPDATE CLASSROOMHASCOURSE
    app.patch(`${routePrefix}/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.update
    ]);
    // DELETE CLASSROOMHASCOURSE
    app.delete(`${routePrefix}/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.remove
    ]);
}