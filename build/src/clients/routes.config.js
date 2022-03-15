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
const RequestMiddleware = __importStar(require("../authorization/middlewares/request.validation"));
const ClientController = __importStar(require("./controller/client.controller"));
const ClientMiddleware = __importStar(require("./middleware/client.middleware"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel: { Admin, Boss } } = env_config_1.default;
exports.default = (app) => {
    // GET ALL CLIENTS
    app.get('/clients', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        RequestMiddleware.queryParameterHoped('offset', 'integer'),
        ClientController.getAll
    ]);
    // GET CLIENT BY ID
    app.get('/client', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ClientMiddleware.clientExistAsQuery("id"),
        ClientController.getById
    ]);
    // CREATE A NEW CLIENT
    app.post('/client', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded([
            'name',
            'address'
        ], 'string'),
        RequestMiddleware.bodyParametersNeeded('email', 'email'),
        RequestMiddleware.bodyParameterHoped('code', 'string'),
        ClientController.create
    ]);
    // UPDATE CLIENT
    app.patch('/client', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ClientMiddleware.clientExistAsQuery("id"),
        RequestMiddleware.bodyParameterHoped('name', 'string'),
        RequestMiddleware.bodyParameterHoped('phone', 'string'),
        RequestMiddleware.bodyParameterHoped('address', 'string'),
        RequestMiddleware.bodyParameterHoped('email', 'email'),
        RequestMiddleware.bodyParameterHoped('code', 'string'),
        ClientController.update
    ]);
    // DELETE CLIENT
    app.delete('/client', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ClientMiddleware.clientExistAsQuery("id"),
        ClientController.remove
    ]);
};
