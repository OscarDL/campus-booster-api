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
const ObservationController = __importStar(require("./controller/observation.controller"));
const ObservationMiddleware = __importStar(require("./middleware/observation.middleware"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel: { Admin, Boss } } = env_config_1.default;
exports.default = (app) => {
    // GET ALL OBSERVATIONS
    app.get('/observations', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        ObservationController.getAll
    ]);
    // GET OBSERVATION BY ID
    app.get('/observation', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ObservationMiddleware.observationExistAsQuery("id"),
        ObservationController.getById
    ]);
    // CREATE A NEW OBSERVATION
    app.post('/observation', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        ObservationController.create
    ]);
    // UPDATE OBSERVATION
    app.patch('/observation', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ObservationMiddleware.observationExistAsQuery("id"),
        ObservationController.update
    ]);
    // DELETE OBSERVATION
    app.delete('/observation', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ObservationMiddleware.observationExistAsQuery("id"),
        ObservationController.remove
    ]);
};
