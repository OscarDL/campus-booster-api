import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ToolController from './controller/tool.controller';
import * as ToolMiddleware from './middleware/tool.middleware';
import config from '../../config/env.config';
import { categories } from './model/tool.interface';
const { 
	permissionLevel: { CampusManager, Student }, 
    customRegex: { regInt } 
} = config;

export default (app: App): void => {
    // GET ALL TOOLS
    app.get('/tools', [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		ToolController.getAll
    ]);
    // GET TOOL BY ID
    app.get(`/tool/:tool_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('tool_id', 'integer'),
        ToolMiddleware.toolExistAsParam("tool_id"),
        ToolController.getById
    ]);
    // CREATE A NEW TOOL
    app.post('/tool', [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusManager ]),
		RequestMiddleware.bodyParametersNeeded(['img','url','title'], 'string'),
        RequestMiddleware.bodyParametersNeeded('category', 'enum', [...categories]),
        RequestMiddleware.bodyParameterHoped('description', 'string'),
		ToolController.create
    ]);
    // UPDATE TOOL
    app.patch(`/tool/:tool_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusManager ]),
		RequestMiddleware.paramParametersNeeded('tool_id', 'integer'),
        ToolMiddleware.toolExistAsParam("tool_id"),
        ToolController.update
    ]);
    // DELETE TOOL
    app.delete(`/tool/:tool_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusManager ]), 
		RequestMiddleware.paramParametersNeeded('tool_id', 'integer'),
        ToolMiddleware.toolExistAsParam("tool_id"),
        ToolController.remove
    ]);
}