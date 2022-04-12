import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as SpecialityController from './controller/speciality.controller';
import * as SpecialityMiddleware from './middleware/speciality.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/specialities'; 

export default (app: App): void => {
    // GET ALL SPECIALITYS
    app.get(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		SpecialityController.getAll
    ]);
    // GET SPECIALITY BY ID
    app.get(`${routePrefix}/:speciality_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('speciality_id', 'integer'),
        SpecialityMiddleware.specialityExistAsParam("speciality_id"),
        SpecialityController.getById
    ]);
    // CREATE A NEW SPECIALITY
    app.post(routePrefix, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['name'], 'string'),
		SpecialityController.create
    ]);
    // UPDATE SPECIALITY
    app.patch(`${routePrefix}/:speciality_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('speciality_id', 'integer'),
        SpecialityMiddleware.specialityExistAsParam("speciality_id"),
        SpecialityController.update
    ]);
    // DELETE SPECIALITY
    app.delete(`${routePrefix}/:speciality_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('speciality_id', 'integer'),
        SpecialityMiddleware.specialityExistAsParam("speciality_id"),
        SpecialityController.remove
    ]);
}