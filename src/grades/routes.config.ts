import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as GradeController from './controller/grade.controller';
import * as GradeMiddleware from './middleware/grade.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/grades';

export default (app: App): void => {
    // GET ALL GRADES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		GradeController.getAll
    ]);
    // GET GRADE BY ID
    app.get(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.getById
    ]);
    // CREATE A NEW GRADE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['average'], 'string'),
		GradeController.create
    ]);
    // UPDATE GRADE
    app.patch(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.update
    ]);
    // DELETE GRADE
    app.delete(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.remove
    ]);
}