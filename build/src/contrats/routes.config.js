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
const ContratController = __importStar(require("./controller/contrat.controller"));
const ContratMiddleware = __importStar(require("./middleware/contrat.middleware"));
const ClientMiddleware = __importStar(require("../clients/middleware/client.middleware"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel: { Admin, Boss } } = env_config_1.default;
exports.default = (app) => {
    // GET ALL CONTRATS
    app.get('/contrats', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        ContratController.getAll
    ]);
    // GET CONTRAT BY ID
    app.get('/contrat', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ContratMiddleware.contratExistAsQuery("id"),
        ContratController.getById
    ]);
    // CREATE A NEW CONTRAT
    app.post('/contrat', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded([
            "num_contrat",
            "montant_ht",
            "total_time",
        ], "string"),
        RequestMiddleware.bodyParametersNeeded([
            "start_date",
            "end_date",
        ], "date"),
        RequestMiddleware.bodyParametersNeeded([
            "client_id",
            "taux_horaire",
        ], "integer"),
        RequestMiddleware.bodyParameterHoped("description", "string"),
        ClientMiddleware.clientExistAsBody("client_id"),
        ContratController.create
    ]);
    // UPDATE CONTRAT
    app.patch('/contrat', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ContratMiddleware.contratExistAsQuery("id"),
        RequestMiddleware.bodyParameterHoped("description", "string"),
        RequestMiddleware.bodyParameterHoped("num_contrat", "string"),
        RequestMiddleware.bodyParameterHoped("start_date", "date"),
        RequestMiddleware.bodyParameterHoped("end_date", "date"),
        RequestMiddleware.bodyParameterHoped("total_time", "string"),
        RequestMiddleware.bodyParameterHoped("remaining_time", "string"),
        RequestMiddleware.bodyParameterHoped("montant_ht", "integer"),
        RequestMiddleware.bodyParameterHoped("taux_horaire", "integer"),
        RequestMiddleware.bodyParameterHoped("client_id", "integer"),
        ClientMiddleware.clientExistAsBody("client_id"),
        ContratController.update
    ]);
    // DELETE CONTRAT
    app.delete('/contrat', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('id', 'integer'),
        ContratMiddleware.contratExistAsQuery("id"),
        ContratController.remove
    ]);
};
