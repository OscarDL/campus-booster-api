import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as PlanningController from './controller/planning.controller';
import * as PlanningMiddleware from './middleware/planning.middleware';
import config from '../../config/env.config';
const {
    customRegex: { regInt }
} = config;

const routePrefix = config.route_prefix + '/plannings';

export default (app: App): void => {
    // GET ALL PLANNINGS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
		PlanningController.getAll
    ]);
    // GET PLANNING BY ID
    app.get(`${routePrefix}/:planning_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.getById
    ]);
    // GET PLANNING BY USER
    app.get(routePrefix + `/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.onlySameUserOrAdmin,    
		PlanningController.getByUser
    ]);
    // GET PLANNING BY CLASS
    app.get(routePrefix + `/classroom/:classroom_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),    
		PlanningController.getByClass
    ]);
    // CREATE A NEW PLANNING
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.bodyParametersNeeded(['date', 'type', 'period'], 'string'),
		RequestMiddleware.bodyParametersNeeded(['classroomHasCourseId'], 'integer'),
		RequestMiddleware.bodyParametersNeeded(['remote', 'cancelled'], 'boolean'),
		PlanningController.create
    ]);
    // UPDATE PLANNING
    app.patch(`${routePrefix}/:planning_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.update
    ]);
    // DELETE PLANNING
    app.delete(`${routePrefix}/:planning_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.remove
    ]);
}