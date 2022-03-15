import { App } from "../../types/express";

import * as AuthController from './controllers/auth.controller';
import * as ValidationMiddleware from './middlewares/auth.validation.middleware';
import * as AuthMiddleware from './middlewares/auth.middleware';
import * as RequestMiddleware from './middlewares/request.validation';


export default (app: App): void => {

  app.post('/auth', [
    RequestMiddleware.bodyParametersNeeded('email', 'email'),
    RequestMiddleware.bodyParametersNeeded('hash', 'string'),
    AuthMiddleware.decryptToken,
    AuthController.login
  ]);

  app.post('/renew', [
    ValidationMiddleware.JWTNeeded,
    ValidationMiddleware.validRefreshToken,
    AuthController.refreshToken
  ]);

}