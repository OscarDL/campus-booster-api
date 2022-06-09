import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as HomeController from './controller/home.controller';
import config from '../../config/env.config';
const { 
    customRegex: { regInt },
    permissionLevel: roles
} = config;

const routePrefix = config.route_prefix + '/home'; 

export default (app: App): void => {
    // GET SUMMARY
    app.get(routePrefix + '/summary', [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)), 
        HomeController.getSummary
    ]);
}