import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CourseController from './controller/course.controller';
import * as CourseMiddleware from './middleware/course.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/courses';

export default (app: App): void => {
    // GET ALL COURSES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		CourseController.getAll
    ]);
    // GET COURSE BY ID
    app.get(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.getById
    ]);
    // CREATE A NEW COURSE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['name','description'], 'string'),
		CourseController.create
    ]);
    // UPDATE COURSE
    app.patch(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.update
    ]);
    // DELETE COURSE
    app.delete(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.remove
    ]);
}