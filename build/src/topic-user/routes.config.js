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
const UserMiddleware = __importStar(require("../users/middleware/user.middleware"));
const TopicMiddleware = __importStar(require("../topics/middleware/topic.middleware"));
const TopicUserController = __importStar(require("./controllers/topic-user.controller"));
const TopicUserMiddleware = __importStar(require("./middleware/topic-user.middleware"));
const AuthorizationMiddleware = __importStar(require("../authorization/middlewares/auth.validation.middleware"));
const PermissionMiddleware = __importStar(require("../authorization/middlewares/auth.permission.middleware"));
const RequestMiddleware = __importStar(require("../authorization/middlewares/request.validation"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { permissionLevel: { Admin, Boss }, customRegex: { regInt } } = env_config_1.default;
exports.default = (app) => {
    // add user to topic
    app.post(`/topic-user`, [
        AuthorizationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.bodyParametersNeeded([
            'user_id',
            'topic_id'
        ], 'integer'),
        UserMiddleware.userExistAsBody('user_id'),
        TopicMiddleware.topicExistAsBody('topic_id'),
        TopicUserController.create
    ]);
    app.delete(`/topic-user/:topic_user_id${regInt}`, [
        AuthorizationMiddleware.validJWTNeeded,
        PermissionMiddleware.iMustBe([Admin, Boss]),
        RequestMiddleware.paramParametersNeeded('topic_user_id', 'integer'),
        TopicUserMiddleware.topicUserExistAsParam('topic_user_id'),
        TopicUserController.remove
    ]);
};
