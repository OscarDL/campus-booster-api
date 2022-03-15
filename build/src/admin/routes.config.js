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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ValidationMiddleware = __importStar(require("../authorization/middlewares/auth.validation.middleware"));
const PermissionMiddleware = __importStar(require("../authorization/middlewares/auth.permission.middleware"));
const VerifyUserMiddleware = __importStar(require("../authorization/middlewares/verify.user.middleware"));
const AuthorizationController = __importStar(require("../authorization/controllers/authorization.controller"));
const AdminController = __importStar(require("./controller/admin.controller"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel } = env_config_1.default;
const { Admin, Boss } = permissionLevel;
exports.default = (app) => {
    // AUTH BACKOFFICE
    app.post('/admin/auth', [
        VerifyUserMiddleware.hasAuthValidFields,
        VerifyUserMiddleware.isPasswordAndUserMatch,
        VerifyUserMiddleware.isValidate,
        PermissionMiddleware.minimumRoleRequired(Admin),
        AuthorizationController.login
    ]);
    // LIST ALL SERVER ROUTES
    app.get('/admin/routes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        AdminController.routes(app)
    ]);
};
