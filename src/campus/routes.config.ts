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
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.iMustBe([ User ]), 
        CampusController.getAll
    ]);
    // GET CAMPUS BY ID
    app.get(`${routePrefix}/:campusId${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.iMustBe([ User ]), 
        RequestMiddleware.paramParametersNeeded('campusId', 'integer'),
        CampusMiddleware.campusExistAsParam("campusId"),
        CampusController.getById
    ]);
    // CREATE A NEW CAMPUS
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.iMustBe([ User ]), 
        RequestMiddleware.bodyParametersNeeded(['name','city','address'], 'string'),
        CampusController.create
    ]);
    // UPDATE CAMPUS
    app.patch(`${routePrefix}/:campusId${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.iMustBe([ User ]), 
        RequestMiddleware.paramParametersNeeded('campusId', 'integer'),
        CampusMiddleware.campusExistAsParam('campusId'),
        CampusController.update
    ]);
    // DELETE CAMPUS
    app.delete(`${routePrefix}/:campusId${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.iMustBe([ User ]), 
        RequestMiddleware.paramParametersNeeded('campusId', 'integer'),
        CampusMiddleware.campusExistAsParam('campusId'),
        CampusController.remove
    ]);
}