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
const TopicController = __importStar(require("./controller/topic.controller"));
const TopicMiddleware = __importStar(require("./middleware/topic.middleware"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel } = env_config_1.default;
const { Admin, Boss } = permissionLevel;
const express_1 = __importDefault(require("../../services/moderator/utils/express"));
const UserMiddleware = __importStar(require("../users/middleware/user.middleware"));
exports.default = (app) => {
    // GET ALL TOPICS
    app.get('/topics', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        TopicController.getAll
    ]);
    // GET TOPIC BY ID
    app.get('/topic', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('name', 'integer'),
        TopicMiddleware.topicExistAsQuery("name"),
        TopicController.getById
    ]);
    // CREATE A NEW TOPIC
    app.post('/topic', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded(['name'], 'string'),
        TopicMiddleware.isNotAlreadyToken,
        RequestMiddleware.bodyParameterHoped('description', 'string'),
        express_1.default.blockFor('name', 'description'),
        TopicController.create
    ]);
    // UPDATE TOPIC
    app.patch('/topic', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('name', 'integer'),
        TopicMiddleware.topicExistAsQuery("name"),
        TopicController.update
    ]);
    // DELETE TOPIC
    app.delete('/topic', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.queryParametersNeeded('name', 'integer'),
        TopicMiddleware.topicExistAsQuery("name"),
        TopicController.remove
    ]);
    app.post('/topic/notification', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded(['name', 'title', 'message'], 'string'),
        TopicMiddleware.topicExistAsBody('name'),
        express_1.default.blockFor('title', 'message'),
        TopicController.sendNotification
    ]);
    app.post('/notification/users', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded(['title', 'message'], 'string'),
        RequestMiddleware.bodyParametersNeeded(['users'], 'array'),
        UserMiddleware.userHasToken,
        express_1.default.blockFor('title', 'message'),
        TopicController.sendNotificationToUsers
    ]);
};
