import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ToolController from './controller/tool.controller';
import * as ToolMiddleware from './middleware/tool.middleware';
import config from '../../config/env.config';
import { categories } from './model/tool.interface';
const { 
	permissionLevel: roles, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/tools';

import s3 from '../../services/aws/s3';
const upload = s3.upload('tools');
const uploadSingle = upload.single('file');

export default (app: App): void => {
    // GET ALL TOOLS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(Object.values(roles)), 
        RequestMiddleware.bodyParametersNeeded('test', 'boolean'),
		ToolController.getAll
    ]);
    // GET TOOL BY ID
    app.get(routePrefix + `/:tool_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(Object.values(roles)), 
		RequestMiddleware.paramParametersNeeded('tool_id', 'integer'),
        ToolMiddleware.toolExistAsParam("tool_id"),
        ToolController.getById
    ]);
    // CREATE A NEW TOOL
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([roles.CampusBoosterAdmin]),
        uploadSingle,
		RequestMiddleware.bodyParametersNeeded(['url','title'], 'string'),
        RequestMiddleware.bodyParametersNeeded('category', 'enum', [...categories]),
        RequestMiddleware.bodyParameterHoped('description', 'string'),
		ToolController.create
    ]);
    // UPDATE TOOL
    app.patch(routePrefix + `/:tool_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([roles.CampusBoosterAdmin]),
		RequestMiddleware.paramParametersNeeded('tool_id', 'integer'),
        ToolMiddleware.toolExistAsParam("tool_id"),
        uploadSingle,
        RequestMiddleware.bodyParameterHoped('url', 'string'),
        RequestMiddleware.bodyParameterHoped('img', 'string'),
        RequestMiddleware.bodyParameterHoped('title', 'string'),
        RequestMiddleware.bodyParameterHoped('category', 'enum', [...categories]),
        RequestMiddleware.bodyParameterHoped('description', 'string'),
        ToolController.update
    ]);
    // DELETE TOOL
    app.delete(routePrefix + `/:tool_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([roles.CampusBoosterAdmin]), 
		RequestMiddleware.paramParametersNeeded('tool_id', 'integer'),
        ToolMiddleware.toolExistAsParam("tool_id"),
        ToolController.remove
    ]);
}