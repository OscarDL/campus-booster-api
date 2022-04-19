import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as PlanningController from './controller/planning.controller';
import * as PlanningMiddleware from './middleware/planning.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

export default (app: App): void => {
    // GET ALL PLANNINGS
    app.get('/plannings', [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		PlanningController.getAll
    ]);
    // GET PLANNING BY ID
    app.get(`/planning/:planning_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.getById
    ]);
    // CREATE A NEW PLANNING
    app.post('/planning', [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['date'], 'string'),
		PlanningController.create
    ]);
    // UPDATE PLANNING
    app.patch(`/planning/:planning_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.update
    ]);
    // DELETE PLANNING
    app.delete(`/planning/:planning_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('planning_id', 'integer'),
        PlanningMiddleware.planningExistAsParam("planning_id"),
        PlanningController.remove
    ]);
}