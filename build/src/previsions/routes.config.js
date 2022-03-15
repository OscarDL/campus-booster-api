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
const PrevisionController = __importStar(require("./controller/prevision.controller"));
const PrevisionMiddleware = __importStar(require("./middleware/prevision.middleware"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel: { Admin, Boss }, customRegex: { regInt } } = env_config_1.default;
exports.default = (app) => {
    // GET ALL PREVISIONS
    app.get('/previsions', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        PrevisionController.getAll
    ]);
    // GET PREVISION BY ID
    app.get(`/prevision/:prevision_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.paramParametersNeeded('prevision_id', 'integer'),
        PrevisionMiddleware.previsionExistAsParam("prevision_id"),
        PrevisionController.getById
    ]);
    // CREATE A NEW PREVISION
    app.post('/prevision', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded(['heures'], 'integer'),
        RequestMiddleware.bodyParametersNeeded(['start_date', 'end_date'], 'date'),
        PrevisionController.create
    ]);
    // UPDATE PREVISION
    app.patch(`/prevision/:prevision_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.paramParametersNeeded('prevision_id', 'integer'),
        PrevisionMiddleware.previsionExistAsParam("prevision_id"),
        PrevisionController.update
    ]);
    // DELETE PREVISION
    app.delete(`/prevision/:prevision_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.paramParametersNeeded('prevision_id', 'integer'),
        PrevisionMiddleware.previsionExistAsParam("prevision_id"),
        PrevisionController.remove
    ]);
};
