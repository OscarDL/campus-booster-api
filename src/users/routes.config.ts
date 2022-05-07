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

const routePrefix = config.route_prefix + '/users';

import multer from '../../services/cloudinary';
const uploader = multer("attendances");
const uploadSingle = uploader.single("file");


export default (app: App): void => {

    // GET ALL USERS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.keys(roles)),
		UserController.getAll
    ]);
    // GET USER BY ID
    app.get(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserController.getById
    ]);
    // CREATE A NEW USER
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed([roles.CampusManager, roles.CampusBoosterAdmin]),
		RequestMiddleware.bodyParametersNeeded(['azureId','firstName','lastName', 'birthday'], 'string'),
        RequestMiddleware.bodyParametersNeeded('email', 'email'),
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
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
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