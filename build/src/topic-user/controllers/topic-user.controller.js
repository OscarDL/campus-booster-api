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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.create = void 0;
const TopicUserService = __importStar(require("../services/topic-user.service"));
const express_1 = require("../../../services/express");
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(yield TopicUserService.create({
                user_id: req.body.user_id,
                topic_id: req.body.topic_id
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.create = create;
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(204).json(yield TopicUserService.remove({
                where: {
                    id: req.params.topic_user_id
                }
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.remove = remove;
