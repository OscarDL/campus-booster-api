import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ContractController from './controller/contract.controller';
import * as ContractMiddleware from './middleware/contract.middleware';
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
		PermissionMiddleware.iMustBe([ Student ]), 
		ContractController.getAll
    ]);
    // GET CONTRACT BY ID
    app.get(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.getById
    ]);
    // CREATE A NEW CONTRACT
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['start_date','end_date'], 'string'),
		ContractController.create
    ]);
    // UPDATE CONTRACT
    app.patch(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.update
    ]);
    // DELETE CONTRACT
    app.delete(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.remove
    ]);
}