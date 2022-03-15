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
exports.userHasToken = exports.isPatchFieldValid = exports.blockEmailModification = exports.unAuthorizedFields = exports.userExistAsParam = exports.userExistAsBody = exports.userExistAsQuery = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const UserService = __importStar(require("../service/user.service"));
const user_interface_1 = require("../model/user.interface");
const express_1 = require("../../../services/express");
const models_config_1 = require("../../../config/models.config");
function userExistAsQuery(name) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.query[name]) {
                const user = yield UserService.findById(req.query[name]);
                return (!user) ? next(boom_1.default.badRequest(`Le salarié n\'existe pas!`)) : next();
            }
            return next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.userExistAsQuery = userExistAsQuery;
function userExistAsBody(name) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body[name]) {
                const user = yield UserService.findById(req.body[name]);
                return (!user) ? next(boom_1.default.badRequest(`Le salarié n\'existe pas!`)) : next();
            }
            return next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.userExistAsBody = userExistAsBody;
function userExistAsParam(name) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.params[name]) {
                const user = yield UserService.findById(req.params[name]);
                return (!user) ? next(boom_1.default.badRequest(`Le salarié n\'existe pas!`)) : next();
            }
            return next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.userExistAsParam = userExistAsParam;
function unAuthorizedFields(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            [
                'validate_account_token',
                'reset_password_token',
                'avatar_public_id',
                'firebase_push_token',
                'createdAt',
                'updatedAt'
            ].forEach(exclude => {
                if (Object.keys(req.body).some(key => key === exclude)) {
                    return (next(boom_1.default.badRequest(`Sorry you can't set ${exclude}.`)));
                }
            });
            return next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.unAuthorizedFields = unAuthorizedFields;
function blockEmailModification(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (req.body.email) ? next(boom_1.default.badRequest('Sorry you cannot modify your email address by this way.')) : next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.blockEmailModification = blockEmailModification;
function isPatchFieldValid(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let details = [];
            if (Object.keys(req.body).length || req.file) {
                if (req.body.password) {
                    if (!req.body.confirmPassword) {
                        details.push('Missing confirmPassword field!');
                    }
                    if (req.body.password !== req.body.confirmPassword) {
                        details.push('Les mots de passes ne correspondent pas!');
                    }
                    if (req.body.password.length < 6) {
                        details.push('Le mot de passe doit être plus long!');
                    }
                    else {
                        delete req.body.confirmPassword;
                    }
                }
                else if (req.body.password === '') {
                    details.push('Le mot de passe doit être plus long!');
                }
                if (details.length) {
                    return next(boom_1.default.badRequest(details.join(', ')));
                }
                else {
                    if (req.body.email) {
                        // ALREADY TAKEN CHECK 
                        const user = yield UserService.findByEmail(req.body.email, 'all');
                        if (user)
                            return (next(boom_1.default.badRequest('L\'adresse email est déjà utilisée!')));
                        // REGEX CHECK
                        if (!(user_interface_1.EMAIL_REGEX.test(req.body.email))) {
                            return (next(boom_1.default.badRequest('Veuillez fournir un format d\'e-mail correct!')));
                        }
                        // BANNED DOMAIN CHECK
                        // if(!Domain.check(req.body.email)) {
                        //     return (next(boom.badRequest('Email invalide, ce domaine n\'est pas autorisé à créer un compte !')))
                        // }
                        return next();
                    }
                    else {
                        return next();
                    }
                }
            }
            return next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.isPatchFieldValid = isPatchFieldValid;
function userHasToken(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body.users) {
                const users = (yield UserService.findAll({
                    where: {
                        firebase_push_token: {
                            [models_config_1.Op.not]: null
                        }
                    },
                    order: [
                        ['createdAt', 'ASC']
                    ]
                }, 'onlyID')).map(u => u === null || u === void 0 ? void 0 : u.id);
                if ((_a = req.body.users) === null || _a === void 0 ? void 0 : _a.some((u) => !users.includes(u))) {
                    const target = yield UserService.findOne({
                        where: {
                            id: (_b = req.body.users) === null || _b === void 0 ? void 0 : _b.find((u) => !users.includes(u))
                        }
                    }, 'defaultScope');
                    if (!target) {
                        return next(boom_1.default.badRequest(`There is no user with ID ${(_c = req.body.users) === null || _c === void 0 ? void 0 : _c.find((u) => !users.includes(u))}!`));
                    }
                    return next(boom_1.default.badRequest(`${target === null || target === void 0 ? void 0 : target.firstname} ${target === null || target === void 0 ? void 0 : target.lastname} cannot receive notification!`));
                }
            }
            return next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.userHasToken = userHasToken;
