import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as PlanningController from './controller/planning.controller';
import * as PlanningMiddleware from './middleware/planning.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/plannings';

export default (app: App): void => {
    // GET ALL PLANNINGS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		PlanningController.getAll
    ]);
    // GET PLANNING BY ID
    app.get(`${routePrefix}/:planning_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.getById
    ]);
    // CREATE A NEW PLANNING
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['date'], 'string'),
		PlanningController.create
    ]);
    // UPDATE PLANNING
    app.patch(`${routePrefix}/:planning_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.update
    ]);
    // DELETE PLANNING
    app.delete(`${routePrefix}/:planning_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.remove
    ]);
}