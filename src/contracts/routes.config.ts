import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ContractController from './controller/contract.controller';
import * as ContractMiddleware from './middleware/contract.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/contracts';

export default (app: App): void => {
    // GET ALL CONTRACTS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		ContractController.getAll
    ]);
    // GET CONTRACT BY ID
    app.get(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.getById
    ]);
    // GET CONTRACT BY USER
    app.get(`${routePrefix}/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin,
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        ContractController.getByUser
    ]);
    // CREATE A NEW CONTRACT
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['start_date','end_date'], 'string'),
		ContractController.create
    ]);
    // UPDATE CONTRACT
    app.patch(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.update
    ]);
    // DELETE CONTRACT
    app.delete(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.remove
    ]);
}