import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CampusController from './controller/campus.controller';
import * as CampusMiddleware from './middleware/campus.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/campus'; 

export default (app: App): void => {
    // GET ALL CAMPUSS
    app.get(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		CampusController.getAll
    ]);
    // GET CAMPUS BY ID
    app.get(`${routePrefix}/:campus_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('campus_id', 'integer'),
        CampusMiddleware.campusExistAsParam("campus_id"),
        CampusController.getById
    ]);
    // CREATE A NEW CAMPUS
    app.post(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['name','city','address'], 'string'),
		CampusController.create
    ]);
    // UPDATE CAMPUS
    app.patch(`${routePrefix}/:campus_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('campus_id', 'integer'),
        CampusMiddleware.campusExistAsParam("campus_id"),
        CampusController.update
    ]);
    // DELETE CAMPUS
    app.delete(`${routePrefix}/:campus_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('campus_id', 'integer'),
        CampusMiddleware.campusExistAsParam("campus_id"),
        CampusController.remove
    ]);
}