import { App } from "../../types/express";

import * as AuthController from './controllers/auth.controller';
import * as ValidationMiddleware from './middlewares/auth.validation.middleware';
import * as AuthMiddleware from './middlewares/auth.middleware';
import * as RequestMiddleware from './middlewares/request.validation';

import config from '../../config/env.config';
const routePrefix = config.route_prefix + '/auth';

export default (app: App): void => {
    // LOGIN
    app.post(routePrefix + '/login', [
        RequestMiddleware.bodyParametersNeeded('azureId', 'string'),
        AuthMiddleware.decryptToken,
        AuthController.login
    ]);
    // LOGOUT
    app.get(routePrefix + '/logout', [
        ValidationMiddleware.JWTNeeded,
        AuthController.logout
    ]);
    // REFRESH TOKEN
    app.post(routePrefix + '/refresh', [
        ValidationMiddleware.JWTNeeded,
        ValidationMiddleware.validRefreshToken,
        AuthController.refreshToken
    ]);
}