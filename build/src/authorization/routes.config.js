"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationController = __importStar(require("./controllers/authorization.controller"));
const VerifyUserMiddleware = __importStar(require("./middlewares/verify.user.middleware"));
const RequestMiddleware = __importStar(require("./middlewares/request.validation"));
const ValidationController = __importStar(require("./middlewares/auth.validation.middleware"));
const UserController = __importStar(require("../users/controller/user.controller"));
exports.default = (app) => {
    // SERVICE LOGIN
    app.post('/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        VerifyUserMiddleware.isValidate,
        AuthorizationController.login,
    ]);
    // REFRESH USER TOKENS
    app.post('/auth/renew', [
        ValidationController.JWTNeeded,
        RequestMiddleware.bodyParametersNeeded('refreshToken', 'string'),
        ValidationController.validRefreshToken,
        AuthorizationController.refreshToken,
    ]);
    // SERVICE PASSWORD FORGOT
    app.post('/auth/forgotPassword', [
        RequestMiddleware.bodyParametersNeeded(['email'], 'email'),
        AuthorizationController.sendNewPassword,
    ]);
    // PASSWORD CHANGED SUCCESSFULLY
    app.get('/auth/passord_changed_success', [
        AuthorizationController.redirectChanged
    ]);
    // SERVIVE LOAD FORM FOR PASSWORD FORGOT
    app.get('/auth/reset_password', [
        VerifyUserMiddleware.emailAndTokenPasswordAreCorrect,
        AuthorizationController.redirectReset,
    ]);
    // SERVICE CHANGE PASSWORD
    app.post('/auth/change_password', [
        VerifyUserMiddleware.emailAndTokenPasswordAreCorrect,
        AuthorizationController.changePwd,
    ]);
    // VALIDATE ACCOUNT
    app.get('/auth/validate_account', [
        VerifyUserMiddleware.emailAndTokenAccountAreCorrect,
        AuthorizationController.validate,
    ]);
    // SEND AGAIN EMAIL TO VALIDATE ACCOUNT
    app.post('/auth/validate_callback', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        VerifyUserMiddleware.userisNotValidate,
        UserController.validate,
    ]);
    // GET APP ANDROID VERSION 
    app.get('/app/version/android', [
        AuthorizationController.version('android')
    ]);
    // GET APP IOS VERSION
    app.get('/app/version/ios', [
        AuthorizationController.version('ios')
    ]);
};
