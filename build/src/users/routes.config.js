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
const UserController = __importStar(require("./controller/user.controller"));
const UserMiddleware = __importStar(require("./middleware/user.middleware"));
const PermissionMiddleware = __importStar(require("../authorization/middlewares/auth.permission.middleware"));
const RequestMiddleware = __importStar(require("../authorization/middlewares/request.validation"));
const ValidationMiddleware = __importStar(require("../authorization/middlewares/auth.validation.middleware"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const express_1 = __importDefault(require("../../services/moderator/utils/express"));
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const uploaderMulter = upload.single('file');
const { permissionLevel: { Restricted, Admin, Boss }, permissionLevel, customRegex: { regInt, regUuidv4 } } = env_config_1.default;
exports.default = (app) => {
    // GET ALL USERS
    app.get('/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        UserController.getAll
    ]);
    // GET USER BY ID
    app.get(`/user/:id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.paramParametersNeeded('id', 'integer'),
        UserMiddleware.userExistAsParam('id'),
        UserController.getById
    ]);
    // GET ME
    app.get('/user/me', [
        ValidationMiddleware.validJWTNeeded,
        UserController.getMe
    ]);
    // CHECK IF EMAIL EXIST
    app.get('/users/find/email', [
        RequestMiddleware.queryParametersNeeded('search', 'email'),
        UserController.emailTaken
    ]);
    // CHECK IF PASSWORD IS CORRECT
    app.get('/user/check/password', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Restricted),
        RequestMiddleware.queryParametersNeeded('password', 'string'),
        UserController.checkPassword
    ]);
    // SEARCH USER 
    app.get('/user/search', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Restricted),
        RequestMiddleware.queryParameterHoped('search', 'string'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        RequestMiddleware.queryParameterHoped('offset', 'integer'),
        UserController.search
    ]);
    // CREATE A NEW USER
    app.post('/user', [
        uploaderMulter,
        RequestMiddleware.bodyParametersNeeded([
            'firstname',
            'lastname',
            'password',
            'birthday',
            'confirmPassword'
        ], 'string'),
        RequestMiddleware.bodyParametersNeeded(['email'], 'email'),
        UserMiddleware.isPatchFieldValid,
        UserMiddleware.unAuthorizedFields,
        PermissionMiddleware.minimunCreationAccountLegalAge,
        express_1.default.blockFor('firstname', 'lastname', 'email'),
        UserController.create,
        UserController.validate
    ]);
    // CREATE A NEW USER ADMIN
    app.post('/user/admin', [
        uploaderMulter,
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded([
            'firstname',
            'lastname',
            'password',
            'confirmPassword'
        ], 'string'),
        RequestMiddleware.bodyParameterHoped('is_validate', 'boolean'),
        RequestMiddleware.bodyParameterHoped('role', 'enum', Object.values(permissionLevel)),
        RequestMiddleware.bodyParametersNeeded(['email'], 'email'),
        RequestMiddleware.bodyParameterHoped('phone', 'string'),
        UserMiddleware.isPatchFieldValid,
        express_1.default.blockFor('firstname', 'lastname', 'email'),
        UserController.create
    ]);
    // UPDATE USER
    app.patch('/user', [
        uploaderMulter,
        ValidationMiddleware.validJWTNeeded,
        RequestMiddleware.queryParametersNeeded(['user_id'], 'integer'),
        UserMiddleware.userExistAsQuery('user_id'),
        PermissionMiddleware.onlySameUserOrSuperAdmin,
        UserMiddleware.isPatchFieldValid,
        UserMiddleware.unAuthorizedFields,
        express_1.default.blockFor('firstname', 'lastname', 'email'),
        UserController.update
    ]);
    // DELETE USER
    app.delete('/user', [
        ValidationMiddleware.validJWTNeeded,
        RequestMiddleware.queryParametersNeeded(['user_id'], 'integer'),
        UserMiddleware.userExistAsQuery('user_id'),
        PermissionMiddleware.onlySameUserOrSuperAdmin,
        UserController.remove
    ]);
    // PUSH YOUR FIREBASE PUSH TOKEN
    app.patch('/user/firebase/add', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Restricted),
        RequestMiddleware.bodyParametersNeeded('token', 'string'),
        UserController.pushToken
    ]);
    // REMOVE YOUR FIREBASE PUSH TOKEN
    app.patch('/user/firebase/rm', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Restricted),
        UserController.rmToken
    ]);
    app.get('/users/firebase', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumRoleRequired(Admin),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        RequestMiddleware.queryParameterHoped('offset', 'integer'),
        UserController.getFirebaseUsers
    ]);
};
