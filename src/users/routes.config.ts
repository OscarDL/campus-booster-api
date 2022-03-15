import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as PermissionMiddleware from '../authorization/middlewares/auth.permission.middleware';
import * as UserController from './controller/user.controller';
import * as UserMiddleware from './middleware/user.middleware';
import config from '../../config/env.config';
const { 
	customRegex: { regUuidv4 },
    permissionLevel: { Student, Admin }
} = config;

export default (app: App): void => {
    // GET ALL USERS
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Student),
		UserController.getAll
    ]);
    // GET USER BY ID
    app.get(`/user/:user_id${regUuidv4}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserController.getById
    ]);
    // CREATE A NEW USER
    app.post('/user', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Admin),
		RequestMiddleware.bodyParametersNeeded(['azure_id','firstname','lastname', 'birthday'], 'string'),
        RequestMiddleware.bodyParametersNeeded('email', 'email'),
		UserController.create
    ]);
    // UPDATE USER
    app.patch(`/user/:user_id${regUuidv4}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserController.update
    ]);
    // DELETE USER
    app.delete(`/user/:user_id${regUuidv4}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserController.remove
    ]);
}