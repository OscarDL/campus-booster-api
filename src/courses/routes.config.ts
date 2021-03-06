import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CourseController from './controller/course.controller';
import * as CourseMiddleware from './middleware/course.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import config from '../../config/env.config';
const { 
    customRegex: { regInt },
    permissionLevel: roles
} = config;

const routePrefix = config.route_prefix + '/courses';

export default (app: App): void => {
    // GET ALL COURSES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)), 
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		CourseController.getAll
    ]);
    // GET ALL COURSES BY USER
    app.get(routePrefix + `/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin,
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
		CourseController.getByUser
    ]);
    // GET COURSE BY ID
    app.get(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)), 
        RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.getById
    ]);
    // CREATE A NEW COURSE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ roles.CampusBoosterAdmin ]), 
		RequestMiddleware.bodyParametersNeeded(['name', 'description', 'link'], 'string'),
        RequestMiddleware.bodyParametersNeeded(['credits', 'year'], 'integer'),
        RequestMiddleware.bodyParameterHoped('speciality', 'boolean'),
		CourseController.create
    ]);
    // UPDATE COURSE
    app.patch(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ roles.CampusBoosterAdmin ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        RequestMiddleware.bodyParameterHoped('name', 'string'),
        RequestMiddleware.bodyParameterHoped('description', 'string'),
        RequestMiddleware.bodyParameterHoped('link', 'string'),
        RequestMiddleware.bodyParameterHoped('credits', 'integer'),
        RequestMiddleware.bodyParameterHoped('year', 'integer'),
        RequestMiddleware.bodyParameterHoped('speciality', 'boolean'),
        CourseController.update
    ]);
    // DELETE COURSE
    app.delete(`${routePrefix}/:course_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ roles.CampusBoosterAdmin ]), 
		RequestMiddleware.paramParametersNeeded('course_id', 'integer'),
        CourseMiddleware.courseExistAsParam("course_id"),
        CourseController.remove
    ]);
}