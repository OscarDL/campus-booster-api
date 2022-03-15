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
exports.verifyApiKey = exports.JWTNeeded = exports.validJWTNeeded = exports.validRefreshToken = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const boom_1 = __importDefault(require("@hapi/boom"));
const UserService = __importStar(require("../../users/service/user.service"));
const express_1 = require("../../../services/express");
function validRefreshToken(req, res, next) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const b = Buffer.from((_a = req.body) === null || _a === void 0 ? void 0 : _a.refreshToken, 'base64');
            const refreshToken = b.toString();
            const refreshId = ((_b = req.jwt) === null || _b === void 0 ? void 0 : _b.id) + env_config_1.default.jwtSecret;
            const hash = crypto_1.default
                .createHmac('sha512', (_c = req.jwt) === null || _c === void 0 ? void 0 : _c.refreshKey)
                .update(refreshId)
                .digest('base64');
            if (hash === refreshToken) {
                req.body = {
                    id: (_d = req.jwt) === null || _d === void 0 ? void 0 : _d.id,
                    refreshKey: (_e = req.jwt) === null || _e === void 0 ? void 0 : _e.refreshKey
                };
                return next();
            }
            return next(boom_1.default.badRequest('Jeton d\'actualisation non valide.'));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.validRefreshToken = validRefreshToken;
;
function validJWTNeeded(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) {
            try {
                const authorization = (_b = req.headers) === null || _b === void 0 ? void 0 : _b.authorization.split(' ');
                if (authorization[0] !== 'Bearer') {
                    return next(boom_1.default.badRequest('Vous devez fournir un bearer token.'));
                }
                else {
                    req.jwt = jsonwebtoken_1.default.verify(authorization[1], env_config_1.default.jwtSecret, env_config_1.default.jwtOptions);
                    req.user = yield UserService.findById(req.jwt.id, {}, 'all');
                    return (req.user) ? next() : next(boom_1.default.unauthorized('Votre session a expiré !'));
                }
            }
            catch (err) {
                console.log(`${err}`.error);
                return next(boom_1.default.unauthorized('Votre session a expiré !'));
            }
        }
        else {
            return next(boom_1.default.badRequest('Aucune autorisation En-tête fourni.'));
        }
    });
}
exports.validJWTNeeded = validJWTNeeded;
;
function JWTNeeded(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        if ((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) {
            try {
                const authorization = req.headers.authorization.split(' ');
                if (authorization[0] !== 'Bearer') {
                    return next(boom_1.default.badRequest('Vous devez fournir un bearer token.'));
                }
                else {
                    req.jwt = jsonwebtoken_1.default.decode(authorization[1]);
                    req.user = yield UserService.findById((_b = req.jwt) === null || _b === void 0 ? void 0 : _b.id);
                    return next();
                }
            }
            catch (err) {
                return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
            }
        }
        else {
            next(boom_1.default.badRequest('Aucune autorisation En-tête fourni.'));
        }
    });
}
exports.JWTNeeded = JWTNeeded;
;
function verifyApiKey(req, res, next) {
    // byepass API_KEY 
    let exeptions = [
        '/auth/reset_password',
        '/auth/validate_account',
        '/auth/change_password',
        '/auth/passord_changed_success',
        '/auth/api',
        '/'
    ];
    if (req.method === "OPTIONS")
        return res.sendStatus(200);
    if (req.url && exeptions.includes(req.url.split('?')[0])) {
        return next();
    }
    if (!req.headers.api_key)
        return next(boom_1.default.badRequest('Vous devez posséder une clé API.'));
    if (req.headers.api_key !== env_config_1.default.API_KEY)
        return next(boom_1.default.badRequest('Votre clé API est incorrecte.'));
    return next();
}
exports.verifyApiKey = verifyApiKey;
