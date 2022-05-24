import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as GradeController from './controller/grade.controller';
import * as GradeMiddleware from './middleware/grade.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import * as TeacherMiddleware from '../teachers/middleware/teacher.middleware';
import * as ClassroomHasCourseMiddleware from '../classroom_has_courses/middleware/classroomhascourse.middleware';
import config from '../../config/env.config';
const {
    customRegex: { regInt },
    permissionLevel: roles
} = config;

const routePrefix = config.route_prefix + '/grades';
const GRADE_PERMISSIONS = Object.values(roles).filter(r => r !== "STUDENT");

export default (app: App): void => {
    // GET ALL GRADES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		GradeController.getAll
    ]);
    // GET GRADE BY ID
    app.get(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.getById
    ]);
    // GET GRADE BY USER
    app.get(`${routePrefix}/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin,
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        GradeController.getByUser
    ]);
    // GET GRADE BY TEACHER
    app.get(`${routePrefix}/teacher/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(GRADE_PERMISSIONS),
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam('teacher_id'),
        GradeController.getByTeacher
    ]);
    // CREATE A NEW GRADE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(GRADE_PERMISSIONS), 
		RequestMiddleware.bodyParametersNeeded(['average'], 'float'),
        RequestMiddleware.bodyParameterHoped("comment", "string"),
        RequestMiddleware.bodyParametersNeeded(["userId", "teacherId", "classroomHasCourseId"], "integer"),
		UserMiddleware.userExistAsBody('userId'),
        TeacherMiddleware.teacherExistAsBody('teacherId'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsBody('classroomHasCourseId'),
        TeacherMiddleware.teacherIsInClassroom,
        UserMiddleware.userIsInClassroom,
        GradeController.create
    ]);
    // UPDATE GRADE
    app.patch(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(GRADE_PERMISSIONS), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        RequestMiddleware.bodyParameterHoped('average', 'float'),
        RequestMiddleware.bodyParameterHoped("comment", "string"),
        RequestMiddleware.bodyParameterBlocked("userId"),
        RequestMiddleware.bodyParameterBlocked("teacherId"),
        RequestMiddleware.bodyParameterBlocked("classroomHasCourseId"),
        GradeController.update
    ]);
    // DELETE GRADE
    app.delete(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(GRADE_PERMISSIONS), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.remove
    ]);
}