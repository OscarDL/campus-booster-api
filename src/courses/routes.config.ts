import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CourseController from './controller/course.controller';
import * as CourseMiddleware from './middleware/course.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/courses';

export default (app: App): void => {
    // GET ALL COURSES
    app.get(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		CourseController.getAll
    ]);
    // GET COURSE BY ID
    app.get(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.getById
    ]);
    // CREATE A NEW COURSE
    app.post(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['name','status','description'], 'string'),
		CourseController.create
    ]);
    // UPDATE COURSE
    app.patch(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.update
    ]);
    // DELETE COURSE
    app.delete(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.remove
    ]);
}