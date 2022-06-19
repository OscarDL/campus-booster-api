import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ContractController from './controller/contract.controller';
import * as ContractMiddleware from './middleware/contract.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import config from '../../config/env.config';
const { 
    customRegex: { regInt },
    permissionLevel: roles
} = config;

import s3 from '../../services/aws/s3';
const upload = s3.uploadDocument("contracts");
const uploadMany = upload.array("files", 5);

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
    // GET CONTRACT BY SUPERVISOR
    app.get(`${routePrefix}/supervisor/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES.concat(roles.Company)),
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        ContractController.getBySupervisor
    ]);
    // CREATE A NEW CONTRACT
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        uploadMany,
		RequestMiddleware.bodyParametersNeeded(['startDate', 'endDate', 'company', 'mission', 'type', 'email', 'phone', 'userId', 'supervisorId'], 'string'),
        ContractMiddleware.formatBodyParameters,
		RequestMiddleware.bodyParametersNeeded(['userId', 'supervisorId'], 'integer'),
		UserMiddleware.userExistAsBody('supervisorId'),
		UserMiddleware.userExistAsBody('userId'),
		ContractController.create
    ]);
    // UPDATE CONTRACT
    app.patch(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        uploadMany,
        ContractMiddleware.formatBodyParameters,
        UserMiddleware.userExistAsBody('supervisorId'),
		UserMiddleware.userExistAsBody('userId'),
        ContractController.update
    ]);
    // DELETE CONTRACT
    app.delete(`${routePrefix}/:contract_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('contract_id', 'integer'),
        ContractMiddleware.contractExistAsParam("contract_id"),
        ContractController.remove
    ]);
}