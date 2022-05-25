import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CourseContentController from './controller/course-content.controller';
import * as CourseContentMiddleware from './middleware/course-content.middleware';
import * as CourseMiddleware from '../courses/middleware/course.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: roles, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/course-contents';

export default (app: App): void => {
    // GET ALL COURSE CONTENTS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(Object.values(roles)), 
		CourseContentController.getAll
    ]);
    // GET COURSE CONTENT BY ID
    app.get(`${routePrefix}/:course_content_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(Object.values(roles)), 
		RequestMiddleware.paramParametersNeeded('course_content_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("course_content_id"),
        CourseContentController.getById
    ]);
    // CREATE A NEW COURSE CONTENT
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.bodyParametersNeeded(['name','link'], 'string'),
        RequestMiddleware.bodyParametersNeeded('courseId', 'integer'),
        RequestMiddleware.bodyParameterHoped('availability', 'boolean'),
        CourseMiddleware.courseExistAsBody('courseId'),
		CourseContentController.create
    ]);
    // UPDATE COURSE CONTENT
    app.patch(`${routePrefix}/:course_content_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('course_content_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("course_content_id"),
        RequestMiddleware.bodyParameterHoped('name', 'string'),
        RequestMiddleware.bodyParameterHoped('link', 'string'),
        RequestMiddleware.bodyParameterHoped('courseId', 'integer'),
        RequestMiddleware.bodyParameterHoped('availability', 'boolean'),
        CourseMiddleware.courseExistAsBody('courseId'),
        CourseContentController.update
    ]);
    // DELETE COURSE CONTENT
    app.delete(`${routePrefix}/:course_content_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('course_content_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("course_content_id"),
        CourseContentController.remove
    ]);
}