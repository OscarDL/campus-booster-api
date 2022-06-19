import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as UserHasClassroomController from './controller/user-hasclassroom.controller';
import * as UserHasClassroomMiddleware from './middleware/user-hasclassroom.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import * as ClassroomMiddleware from '../classrooms/middleware/classroom.middleware';
import config from '../../config/env.config';
const { 
	  permissionLevel: roles, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/userhasclassrooms';

export default (app: App): void => {
    // GET ALL USER HASCLASSROOMS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)), 
        UserHasClassroomController.getAll
    ]);
    // GET USER HASCLASSROOM BY ID
    app.get(`${routePrefix}/:userhasclassroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)), 
		RequestMiddleware.paramParametersNeeded('userhasclassroom_id', 'integer'),
        UserHasClassroomMiddleware.userhasclassroomExistAsParam("userhasclassroom_id"),
        UserHasClassroomController.getById
    ]);
    // CREATE A NEW USER HASCLASSROOM
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([roles.FullProfessor, roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin]),
        RequestMiddleware.bodyParametersNeeded([
            "classroomId",
            "userId"
        ], "integer"),
        UserMiddleware.userExistAsBody('userId'),
        ClassroomMiddleware.classroomExistAsBody('classroomId'),
		UserHasClassroomController.create
    ]);
    // UPDATE USER HASCLASSROOM
    app.patch(`${routePrefix}/:userhasclassroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([roles.FullProfessor, roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin]), 
		RequestMiddleware.paramParametersNeeded('userhasclassroom_id', 'integer'),
        UserHasClassroomMiddleware.userhasclassroomExistAsParam("userhasclassroom_id"),
        RequestMiddleware.bodyParameterHoped('userId', 'integer'),
        RequestMiddleware.bodyParameterHoped('classroomId', 'integer'),
        UserMiddleware.userExistAsBody('userId'),
        ClassroomMiddleware.classroomExistAsBody('classroomId'),
        UserHasClassroomController.update
    ]);
    // DELETE USER HASCLASSROOM
    app.delete(`${routePrefix}/:userhasclassroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin]),
		RequestMiddleware.paramParametersNeeded('userhasclassroom_id', 'integer'),
        UserHasClassroomMiddleware.userhasclassroomExistAsParam("userhasclassroom_id"),
        UserHasClassroomController.remove
    ]);
}