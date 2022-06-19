import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as FeedbackController from './controller/feedback.controller';
import * as FeedbackMiddleware from './middleware/feedback.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { CampusBoosterAdmin }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/feedbacks'; 

export default (app: App): void => {
    // GET ALL FEEDBACKS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusBoosterAdmin ]), 
		FeedbackController.getAll
    ]);
    // GET FEEDBACK BY ID
    app.get(`${routePrefix}/:feedback_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusBoosterAdmin ]), 
		RequestMiddleware.paramParametersNeeded('feedback_id', 'integer'),
        FeedbackMiddleware.feedbackExistAsParam("feedback_id"),
        FeedbackController.getById
    ]);
    // CREATE A NEW FEEDBACK
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusBoosterAdmin ]), 
		RequestMiddleware.bodyParametersNeeded(['presentation','pedagogy','technicalCompetence','fluencyInSpeaking'], 'string'),
		FeedbackController.create
    ]);
    // UPDATE FEEDBACK
    app.patch(`${routePrefix}/:feedback_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusBoosterAdmin ]), 
		RequestMiddleware.paramParametersNeeded('feedback_id', 'integer'),
        FeedbackMiddleware.feedbackExistAsParam("feedback_id"),
        FeedbackController.update
    ]);
    // DELETE FEEDBACK
    app.delete(`${routePrefix}/:feedback_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ CampusBoosterAdmin ]), 
		RequestMiddleware.paramParametersNeeded('feedback_id', 'integer'),
        FeedbackMiddleware.feedbackExistAsParam("feedback_id"),
        FeedbackController.remove
    ]);
}