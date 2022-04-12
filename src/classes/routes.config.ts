import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ClasseController from './controller/classe.controller';
import * as ClasseMiddleware from './middleware/classe.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/classes'; 

export default (app: App): void => {
    // GET ALL CLASSES
    app.get(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		ClasseController.getAll
    ]);
    // GET CLASSE BY ID
    app.get(`${routePrefix}/:classe_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classe_id', 'integer'),
        ClasseMiddleware.classeExistAsParam("classe_id"),
        ClasseController.getById
    ]);
    // CREATE A NEW CLASSE
    app.post(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['section'], 'string'),
		ClasseController.create
    ]);
    // UPDATE CLASSE
    app.patch(`${routePrefix}/:classe_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classe_id', 'integer'),
        ClasseMiddleware.classeExistAsParam("classe_id"),
        ClasseController.update
    ]);
    // DELETE CLASSE
    app.delete(`${routePrefix}/:classe_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('classe_id', 'integer'),
        ClasseMiddleware.classeExistAsParam("classe_id"),
        ClasseController.remove
    ]);
}