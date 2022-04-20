import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as BalanceController from './controller/balance.controller';
import * as BalanceMiddleware from './middleware/balance.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/balances';

export default (app: App): void => {
    // GET ALL BALANCES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		BalanceController.getAll
    ]);
    // GET BALANCE BY ID
    app.get(`${routePrefix}/:balance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('balance_id', 'integer'),
        BalanceMiddleware.balanceExistAsParam("balance_id"),
        BalanceController.getById
    ]);
    // CREATE A NEW BALANCE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['date_req','date_ope'], 'string'),
		BalanceController.create
    ]);
    // UPDATE BALANCE
    app.patch(`${routePrefix}/:balance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('balance_id', 'integer'),
        BalanceMiddleware.balanceExistAsParam("balance_id"),
        BalanceController.update
    ]);
    // DELETE BALANCE
    app.delete(`${routePrefix}/:balance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('balance_id', 'integer'),
        BalanceMiddleware.balanceExistAsParam("balance_id"),
        BalanceController.remove
    ]);
}