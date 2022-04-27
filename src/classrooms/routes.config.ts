import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ClassroomController from './controller/classroom.controller';
import * as ClassroomMiddleware from './middleware/classroom.middleware';
import * as CampusMiddleware from '../campus/middleware/campus.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User, CampusManager, CampusBoosterAdmin }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/classrooms'; 

export default (app: App): void => {
    // GET ALL CLASSES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		ClassroomController.getAll
    ]);
    // GET CLASSE BY ID
    app.get(`${routePrefix}/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam("classroom_id"),
        ClassroomController.getById
    ]);
    // CREATE A NEW CLASSE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ CampusManager, CampusBoosterAdmin ]), 
		RequestMiddleware.bodyParametersNeeded(['section', 'campusId'], 'integer'),
        CampusMiddleware.campusExistAsBody('campusId'),
		ClassroomController.create
    ]);
    // UPDATE CLASSE
    app.patch(`${routePrefix}/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam("classroom_id"),
        ClassroomController.update
    ]);
    // DELETE CLASSE
    app.delete(`${routePrefix}/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classroom_id', 'integer'),
        ClassroomMiddleware.classroomExistAsParam("classroom_id"),
        ClassroomController.remove
    ]);
}