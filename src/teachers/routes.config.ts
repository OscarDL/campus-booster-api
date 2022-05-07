import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as TeacherController from './controller/teacher.controller';
import * as TeacherMiddleware from './middleware/teacher.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import * as ClassroomHasCourseMiddleware from '../classroom_has_courses/middleware/classroomhascourse.middleware';
import config from '../../config/env.config';
const { 
	  permissionLevel: { Student, CampusManager, FullProfessor }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/teachers'; 

export default (app: App): void => {
    // GET ALL TEACHERS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Student), 
        TeacherController.getAll
    ]);
    // GET TEACHER BY ID
    app.get(`${routePrefix}/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Student), 
        RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam("teacher_id"),
        TeacherController.getById
    ]);
    // CREATE A NEW TEACHER
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		    PermissionMiddleware.minimumRoleRequired(FullProfessor),
        RequestMiddleware.bodyParametersNeeded([
            "userId",
            "classroomHasCourseId"
        ], "integer"),
        UserMiddleware.userExistAsBody("userId"),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsBody("classroomHasCourseId"),
		    TeacherController.create
    ]);
    // UPDATE TEACHER
    app.patch(`${routePrefix}/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		    PermissionMiddleware.minimumRoleRequired(FullProfessor),
		    RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam("teacher_id"),
        RequestMiddleware.bodyParameterHoped("userId", "integer"),
        RequestMiddleware.bodyParameterHoped("classroomHasCourseId", "integer"),
        UserMiddleware.userExistAsBody("userId"),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsBody("classroomHasCourseId"),
        TeacherController.update
    ]);
    // DELETE TEACHER
    app.delete(`${routePrefix}/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		    PermissionMiddleware.minimumRoleRequired(CampusManager), 
		    RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam("teacher_id"),
        TeacherController.remove
    ]);
}