import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ClassroomController from './controller/classroom.controller';
import * as ClassroomMiddleware from './middleware/classroom.middleware';
import * as CampusMiddleware from '../campus/middleware/campus.middleware';
import * as CourseMiddleware from '../courses/middleware/course.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import config from '../../config/env.config';
const {
    customRegex: { regInt }
} = config;

const routePrefix = config.route_prefix + '/classrooms'; 

export default (app: App): void => {
    // GET ALL CLASSROOMS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		ClassroomController.getAll
    ]);
    // GET CLASSROOM BY ID
    app.get(`${routePrefix}/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam("classroom_id"),
        ClassroomController.getById
    ]);
    // GET CLASSROOM BY USER
    app.get(`${routePrefix}/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin, 
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        ClassroomController.getMine
    ]);
    // ADD COURSES TO CLASSROOM
    app.post(routePrefix + `/:classroom_id${regInt}/courses/add`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam('classroom_id'),
        RequestMiddleware.bodyParametersNeeded('courses', 'array'),
        CourseMiddleware.courseCanBeLinkedToClassroom,
        ClassroomController.addCoursesToClassroom
    ]);
    // REMOVE COURSES FROM CLASSROOM
    app.post(routePrefix + `/:classroom_id${regInt}/courses/remove`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam('classroom_id'),
        RequestMiddleware.bodyParametersNeeded('courses', 'array'),
        CourseMiddleware.courseCanBeUnLinkedFromClassroom,
        ClassroomController.removeCoursesFromClassroom
    ]);
    // CREATE A NEW CLASSROOM
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.bodyParametersNeeded(['name'], 'string'),
        RequestMiddleware.bodyParameterHoped('promotion', "integer"),
        RequestMiddleware.bodyParameterHoped('campusId', "integer"),
        CampusMiddleware.campusExistAsBody('campusId'),
		ClassroomController.create
    ]);
    // UPDATE CLASSROOM
    app.patch(`${routePrefix}/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam("classroom_id"),
        ClassroomController.update
    ]);
    // DELETE CLASSROOM
    app.delete(`${routePrefix}/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam("classroom_id"),
        ClassroomController.remove
    ]);
}