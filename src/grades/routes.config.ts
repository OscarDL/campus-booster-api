import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as GradeController from './controller/grade.controller';
import * as GradeMiddleware from './middleware/grade.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import config from '../../config/env.config';
const {
    customRegex: { regInt }
} = config;

const routePrefix = config.route_prefix + '/grades';

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
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.getById
    ]);
    // GET GRADE BY USER
    app.get(`${routePrefix}/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        GradeController.getByUser
    ]);
    // CREATE A NEW GRADE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.bodyParametersNeeded(['average'], 'string'),
		GradeController.create
    ]);
    // UPDATE GRADE
    app.patch(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.update
    ]);
    // DELETE GRADE
    app.delete(`${routePrefix}/:grade_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('grade_id', 'integer'),
        GradeMiddleware.gradeExistAsParam("grade_id"),
        GradeController.remove
    ]);
}