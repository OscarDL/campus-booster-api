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

export default (app: App): void => {
    // GET ALL CLASSROOMHASCOURSES
    app.get('/classroomhascourses', [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		ClassroomHasCourseController.getAll
    ]);
    // GET CLASSROOMHASCOURSE BY ID
    app.get(`/classroomhascourse/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.getById
    ]);
    // CREATE A NEW CLASSROOMHASCOURSE
    app.post('/classroomhascourse', [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		ClassroomHasCourseController.create
    ]);
    // UPDATE CLASSROOMHASCOURSE
    app.patch(`/classroomhascourse/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.update
    ]);
    // DELETE CLASSROOMHASCOURSE
    app.delete(`/classroomhascourse/:classroomhascourse_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroomhascourse_id', 'integer'),
        ClassroomHasCourseMiddleware.classroomhascourseExistAsParam("classroomhascourse_id"),
        ClassroomHasCourseController.remove
    ]);
}