import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as BalanceController from './controller/balance.controller';
import * as BalanceMiddleware from './middleware/balance.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';

import config from '../../config/env.config';
import { balanceStatus } from './model/balance.interface';
const { 
	permissionLevel: roles, 
    customRegex: { regInt } 
} = config;

const ADMIN = [ roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin ];
const routePrefix = config.route_prefix + '/balances';

export default (app: App): void => {
    // GET ALL BALANCES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		    PermissionMiddleware.rolesAllowed(ADMIN), 
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        RequestMiddleware.queryParameterHoped('offset', 'float'),
		    BalanceController.getAll
    ]);
    // GET USER BALANCES
    app.get(routePrefix + `/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
		    BalanceController.getUser
    ]);
    // GET BALANCE BY ID
    app.get(`${routePrefix}/:balance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(ADMIN), 
        RequestMiddleware.paramParametersNeeded('balance_id', 'integer'),
        BalanceMiddleware.balanceExistAsParam("balance_id"),
        BalanceController.getById
    ]);
    // CREATE A NEW BALANCE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(ADMIN),
        RequestMiddleware.bodyParametersNeeded('userId', 'integer'),
        RequestMiddleware.bodyParametersNeeded('debit', 'float'),
        RequestMiddleware.bodyParametersNeeded('credit', 'float'),
        RequestMiddleware.bodyParametersNeeded("status", "enum", [...balanceStatus]),
        RequestMiddleware.bodyParametersNeeded('description', "string"),
		    RequestMiddleware.bodyParametersNeeded('dateRequested', 'string'),
		    RequestMiddleware.bodyParameterHoped('dateConfirmed', 'string'),
		    BalanceController.create
    ]);
    // UPDATE BALANCE
    app.patch(`${routePrefix}/:balance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(ADMIN), 
        RequestMiddleware.paramParametersNeeded('balance_id', 'integer'),
        BalanceMiddleware.balanceExistAsParam("balance_id"),
        RequestMiddleware.bodyParameterHoped('dateRequested', 'string'),
        RequestMiddleware.bodyParameterHoped('dateConfirmed', 'string'),
        RequestMiddleware.bodyParameterHoped('description', "string"),
        RequestMiddleware.bodyParameterHoped('debit', "string"),
        RequestMiddleware.bodyParameterHoped('credit', "string"),
        RequestMiddleware.bodyParameterHoped("status", "enum", [...balanceStatus]),
        BalanceController.update
    ]);
    // DELETE BALANCE
    app.delete(`${routePrefix}/:balance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(ADMIN), 
        RequestMiddleware.paramParametersNeeded('balance_id', 'integer'),
        BalanceMiddleware.balanceExistAsParam("balance_id"),
        BalanceController.remove
    ]);
}