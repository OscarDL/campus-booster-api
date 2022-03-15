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
exports.userisNotValidate = exports.emailAndTokenAccountAreCorrect = exports.emailAndTokenPasswordAreCorrect = exports.isValidate = exports.isPasswordAndUserMatch = exports.hasAuthValidFields = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const UserService = __importStar(require("../../users/service/user.service"));
const env_config_1 = __importDefault(require("../../../config/env.config"));
const { app_name, permissionLevel } = env_config_1.default;
const { Banned } = permissionLevel;
function hasAuthValidFields(req, res, next) {
    let details = [];
    const { email, password } = req.body;
    if (!email) {
        details.push('Champ e-mail manquant');
    }
    if (!password) {
        details.push('Champ de mot de passe manquant');
    }
    if (details.length) {
        return next(boom_1.default.badRequest(details.join(', ')));
    }
    else {
        return next();
    }
}
exports.hasAuthValidFields = hasAuthValidFields;
function isPasswordAndUserMatch(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserService.findByEmail((_a = req.body) === null || _a === void 0 ? void 0 : _a.email, 'all');
            if (!user) {
                return next(boom_1.default.badRequest('Aucun compte lié à cette adresse e-mail.'));
            }
            else {
                if (user.role <= Banned) {
                    return next(boom_1.default.forbidden(`Vous avez été banni de ${app_name}.`));
                }
                if (((_b = req.body) === null || _b === void 0 ? void 0 : _b.password) === user.password) {
                    return next();
                }
                else {
                    return next(boom_1.default.badRequest('L\'e-mail et mot de passe ne correspondent pas.'));
                }
            }
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(boom_1.default.internal(err.name));
        }
    });
}
exports.isPasswordAndUserMatch = isPasswordAndUserMatch;
function isValidate(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        req.user = yield UserService.findByEmail(req.body.email, 'all');
        return ((_a = req.user) === null || _a === void 0 ? void 0 : _a.is_validate) ?
            next() :
            next(boom_1.default.notAcceptable(`Vous avez reçu un e-mail à ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.email} pour valider votre compte.`));
    });
}
exports.isValidate = isValidate;
function emailAndTokenPasswordAreCorrect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.query.email && req.query.token && req.query.token !== null && req.query.token.length) {
            const user = yield UserService.findOne({
                where: {
                    email: req.query.email,
                    reset_password_token: req.query.token,
                }
            }, 'onlyID');
            return (user) ? next() : res.status(410).json('Le lien a expiré, veuillez demander à nouveau le changement de mot de passe !');
        }
        else {
            return res.status(410).json('Lien incorrecte !');
        }
    });
}
exports.emailAndTokenPasswordAreCorrect = emailAndTokenPasswordAreCorrect;
function emailAndTokenAccountAreCorrect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.query.email && req.query.token && req.query.token !== null && req.query.token.length) {
            const user = yield UserService.findOne({
                where: {
                    email: req.query.email,
                    validate_account_token: req.query.token,
                }
            }, 'onlyID');
            return (user) ? next() : res.status(410).json('Le lien a expiré, veuillez demander à nouveau pour créer un compte !');
        }
        else {
            return res.status(410).json('Lien incorrecte !');
        }
    });
}
exports.emailAndTokenAccountAreCorrect = emailAndTokenAccountAreCorrect;
function userisNotValidate(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield UserService.findByEmail((_a = req.body) === null || _a === void 0 ? void 0 : _a.email, 'all');
        if (user) {
            return (user === null || user === void 0 ? void 0 : user.is_validate) ? next(boom_1.default.badRequest('Désolé, ce compte est déjà validé !')) : next();
        }
        else {
            return next(boom_1.default.badRequest('Aucun utilisateur lié à cette adresse e-mail !'));
        }
    });
}
exports.userisNotValidate = userisNotValidate;
