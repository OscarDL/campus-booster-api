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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationToUsers = exports.sendNotification = exports.remove = exports.update = exports.create = exports.getAll = exports.getById = void 0;
const TopicService = __importStar(require("../service/topic.service"));
const firebase_1 = __importDefault(require("../../../services/firebase"));
const UserService = __importStar(require("../../users/service/user.service"));
const express_1 = require("../../../services/express");
function getById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield TopicService.findById(req.query.name));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.getById = getById;
function getAll(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield TopicService.findAll({
                limit: (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.getAll = getAll;
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(yield TopicService.create(req.body));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.create = create;
function update(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(203).json(yield TopicService.update((_a = req.query) === null || _a === void 0 ? void 0 : _a.name, req.body));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.update = update;
function remove(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(204).json(yield TopicService.remove({
                where: {
                    name: (_a = req.query) === null || _a === void 0 ? void 0 : _a.name
                }
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.remove = remove;
function sendNotification(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(yield firebase_1.default.sendToTopic(req.body.name, req.body.title, req.body.message, {
                type: 'custom',
                value: null
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.sendNotification = sendNotification;
function sendNotificationToUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(yield firebase_1.default.sendToDevices((yield UserService.findAll({
                where: {
                    id: req.body.users,
                }
            }, 'defaultScope')).map(u => u.firebase_push_token), req.body.title, req.body.message, {
                'type': 'custom'
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.sendNotificationToUsers = sendNotificationToUsers;
