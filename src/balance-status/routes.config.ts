import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as BalanceStatusController from './controller/balance-status.controller';
import * as BalanceStatusMiddleware from './middleware/balance-status.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/balancestatus';

export default (app: App): void => {
    // GET ALL BALANCE STATUSS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		BalanceStatusController.getAll
    ]);
    // GET BALANCE STATUS BY ID
    app.get(`${routePrefix}/:balancestatus_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('balancestatus_id', 'integer'),
        BalanceStatusMiddleware.balancestatusExistAsParam("balancestatus_id"),
        BalanceStatusController.getById
    ]);
    // CREATE A NEW BALANCE STATUS
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['label','validate'], 'string'),
		BalanceStatusController.create
    ]);
    // UPDATE BALANCE STATUS
    app.patch(`${routePrefix}/:balancestatus_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('balancestatus_id', 'integer'),
        BalanceStatusMiddleware.balancestatusExistAsParam("balancestatus_id"),
        BalanceStatusController.update
    ]);
    // DELETE BALANCE STATUS
    app.delete(`${routePrefix}/:balancestatus_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('balancestatus_id', 'integer'),
        BalanceStatusMiddleware.balancestatusExistAsParam("balancestatus_id"),
        BalanceStatusController.remove
    ]);
}