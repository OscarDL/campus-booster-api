import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as ProjectController from './controller/project.controller';
import * as ProjectMiddleware from './middleware/project.middleware';
import config from '../../config/env.config';
const {
    customRegex: { regInt }
} = config;

const routePrefix = config.route_prefix + '/projects';

export default (app: App): void => {
    // GET ALL PROJECTS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
		ProjectController.getAll
    ]);
    // GET PROJECT BY ID
    app.get(`${routePrefix}/:project_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
		RequestMiddleware.paramParametersNeeded('project_id', 'integer'),
        ProjectMiddleware.projectExistAsParam("project_id"),
        ProjectController.getById
    ]);
    // GET PROJECT BY USER
    app.get(routePrefix + `/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin,
		ProjectController.getByUser
    ]);
    // GET PROJECT BY CLASS
    app.get(routePrefix + `/classroom/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
		ProjectController.getByClass
    ]);
    // CREATE A NEW PROJECT
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.bodyParametersNeeded(['classroomHasCourseId'], 'integer'),
		RequestMiddleware.bodyParametersNeeded(['startDate', 'endDate', 'title', 'link'], 'string'),
		RequestMiddleware.bodyParameterHoped('details', 'string'),
		ProjectController.create
    ]);
    // UPDATE PROJECT
    app.patch(`${routePrefix}/:project_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('project_id', 'integer'),
        ProjectMiddleware.projectExistAsParam("project_id"),
        ProjectController.update
    ]);
    // DELETE PROJECT
    app.delete(`${routePrefix}/:project_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('project_id', 'integer'),
        ProjectMiddleware.projectExistAsParam("project_id"),
        ProjectController.remove
    ]);
}