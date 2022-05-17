import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as PermissionMiddleware from '../authorization/middlewares/auth.permission.middleware';
import * as UserController from './controller/user.controller';
import * as UserMiddleware from './middleware/user.middleware';
import * as CampusMiddleware from '../campus/middleware/campus.middleware';

import config from '../../config/env.config';
const { 
	customRegex: { regInt },
    permissionLevel: roles
} = config;

import s3 from '../../services/aws/s3';
const upload = s3.uploadImage("users");
const singleUpload = upload.single("file");

const routePrefix = config.route_prefix + '/users';

export default (app: App): void => {
    // GET ALL USERS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)),
        UserController.getAll
    ]);
    // GET USER BY ID
    app.get(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserMiddleware.iamAdminOrItsaStudent,
        UserController.getById
    ]);
    // CREATE A NEW USER
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed([roles.CampusManager, roles.CampusBoosterAdmin]),
        singleUpload,
		RequestMiddleware.bodyParametersNeeded(['firstName','lastName', 'birthday'], 'string'),
        RequestMiddleware.bodyParametersNeeded('email', 'email'),
        RequestMiddleware.bodyParameterHoped("personalEmail", "email"),
        UserMiddleware.emailIsNotTaken,
        RequestMiddleware.bodyParametersNeeded([
            'campusId'
        ], 'integer'),
        CampusMiddleware.campusExistAsBody('campusId'),
		UserController.create
    ]);
    // UPDATE USER
    app.patch(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
        RequestMiddleware.bodyParameterBlocked('email'),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        singleUpload,
        RequestMiddleware.bodyParameterHoped('campusId', 'integer'),
        CampusMiddleware.campusExistAsBody('campusId'),
        UserController.update
    ]);
    // DELETE USER
    app.delete(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserController.remove
    ]);
}