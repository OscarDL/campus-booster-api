import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as UserHasClassroomController from './controller/user-hasclassroom.controller';
import * as UserHasClassroomMiddleware from './middleware/user-hasclassroom.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/userhasclassrooms';

export default (app: App): void => {
    // GET ALL USER HASCLASSROOMS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		UserHasClassroomController.getAll
    ]);
    // GET USER HASCLASSROOM BY ID
    app.get(`${routePrefix}/:userhasclassroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('userhasclassroom_id', 'integer'),
        UserHasClassroomMiddleware.userhasclassroomExistAsParam("userhasclassroom_id"),
        UserHasClassroomController.getById
    ]);
    // CREATE A NEW USER HASCLASSROOM
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		UserHasClassroomController.create
    ]);
    // UPDATE USER HASCLASSROOM
    app.patch(`${routePrefix}/:userhasclassroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('userhasclassroom_id', 'integer'),
        UserHasClassroomMiddleware.userhasclassroomExistAsParam("userhasclassroom_id"),
        UserHasClassroomController.update
    ]);
    // DELETE USER HASCLASSROOM
    app.delete(`${routePrefix}/:userhasclassroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('userhasclassroom_id', 'integer'),
        UserHasClassroomMiddleware.userhasclassroomExistAsParam("userhasclassroom_id"),
        UserHasClassroomController.remove
    ]);
}