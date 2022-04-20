import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as TeacherController from './controller/teacher.controller';
import * as TeacherMiddleware from './middleware/teacher.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/teachers'; 

export default (app: App): void => {
    // GET ALL TEACHERS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		TeacherController.getAll
    ]);
    // GET TEACHER BY ID
    app.get(`${routePrefix}/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam("teacher_id"),
        TeacherController.getById
    ]);
    // CREATE A NEW TEACHER
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		TeacherController.create
    ]);
    // UPDATE TEACHER
    app.patch(`${routePrefix}/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam("teacher_id"),
        TeacherController.update
    ]);
    // DELETE TEACHER
    app.delete(`${routePrefix}/:teacher_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('teacher_id', 'integer'),
        TeacherMiddleware.teacherExistAsParam("teacher_id"),
        TeacherController.remove
    ]);
}