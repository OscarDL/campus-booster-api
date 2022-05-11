import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ClassroomHasCourseController from './controller/classroomhascourse.controller';
import * as ClassroomHasCourseMiddleware from './middleware/classroomhascourse.middleware';
import * as ClassroomMiddleware from '../classrooms/middleware/classroom.middleware';
import * as CourseMiddleware from '../courses/middleware/course.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: roles, 
    customRegex: { regInt } 
} = config;

const ADMIN = [ roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin ];
const routePrefix = config.route_prefix + '/classroomhascourses';

export default (app: App): void => {
    // GET ALL CLASSROOMHASCOURSES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles).filter(role => role !== roles.Company)), 
        ClassroomHasCourseController.getAll
    ]);
    // GET CLASSROOMHASCOURSE BY ID
    app.get(`${routePrefix}/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(Object.values(roles).filter(role => role !== roles.Company)), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.getById
    ]);
    // CREATE A NEW CLASSROOMHASCOURSE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(ADMIN.concat(roles.FullProfessor)),
        RequestMiddleware.bodyParametersNeeded([
            "courseId",
            "classroomId"
        ], "integer"),
        CourseMiddleware.courseExistAsBody("courseId"),
        ClassroomMiddleware.classroomExistAsBody("classroomId"),
		ClassroomHasCourseController.create
    ]);
    // UPDATE CLASSROOMHASCOURSE
    app.patch(`${routePrefix}/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(ADMIN.concat(roles.FullProfessor)),
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        RequestMiddleware.bodyParameterHoped("classroomId", "integer"),
        RequestMiddleware.bodyParameterHoped("courseId", "integer"),
        CourseMiddleware.courseExistAsBody("courseId"),
        ClassroomMiddleware.classroomExistAsBody("classroomId"),
        ClassroomHasCourseController.update
    ]);
    // DELETE CLASSROOMHASCOURSE
    app.delete(`${routePrefix}/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(ADMIN),
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.remove
    ]);
}