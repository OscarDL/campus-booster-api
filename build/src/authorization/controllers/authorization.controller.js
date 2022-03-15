"use strict";
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
exports.version = exports.validate = exports.changePwd = exports.redirectChanged = exports.redirectReset = exports.sendNewPassword = exports.refreshToken = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const env_config_1 = __importDefault(require("../../../config/env.config"));
const boom_1 = __importDefault(require("@hapi/boom"));
const user_service_1 = require("../../users/service/user.service");
const express_1 = require("../../../services/express");
const mailing_1 = __importDefault(require("../../../services/mailing"));
const Mailer = new mailing_1.default();
function login(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body = {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id
            };
            const refreshId = ((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) + env_config_1.default.jwtSecret;
            const salt = crypto_1.default.randomBytes(16).toString('base64');
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(refreshId)
                .digest('base64');
            req.body.refreshKey = salt;
            return res.status(201).json({
                accessToken: jsonwebtoken_1.default.sign(req.body, env_config_1.default.jwtSecret, env_config_1.default.jwtOptions),
                refreshToken: Buffer.from(hash).toString('base64'),
                user: yield (0, user_service_1.findOne)({
                    where: {
                        id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id
                    }
                }, 'defaultScope')
            });
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.login = login;
;
function refreshToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(201).json({
                accessToken: jsonwebtoken_1.default.sign(req.body, env_config_1.default.jwtSecret, env_config_1.default.jwtOptions)
            });
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.refreshToken = refreshToken;
;
function sendNewPassword(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.findByEmail)((_a = req.body) === null || _a === void 0 ? void 0 : _a.email);
        if (user) {
            // create refresh password token
            const token = crypto_1.default.randomBytes(30).toString('hex');
            // update user info
            yield (0, user_service_1.update)(user.id, { reset_password_token: token });
            // send email
            return (yield Mailer.custom('forget-password', {
                email: req.body.email,
                username: `${user.firstname} ${user.lastname}`,
                token: token,
                origin: `${env_config_1.default.app_uri}/auth/passord_changed_success`
            })) ? res.status(200).json({
                message: `Un e-mail a été envoyé à ${req.body.email} pour réinitialiser votre mot de passe !`
            }) : next(boom_1.default.badRequest(`L'e-mail n'a pas été envoyé à ${req.body.email} !`));
        }
        else {
            return next(boom_1.default.badRequest('Ce compte de messagerie n`\'existe pas !'));
        }
    });
}
exports.sendNewPassword = sendNewPassword;
function redirectReset(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(302).render('reset_password');
    });
}
exports.redirectReset = redirectReset;
function redirectChanged(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        return res.status(302).render('changed');
    });
}
exports.redirectChanged = redirectChanged;
function changePwd(req, res, next) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.findByEmail)(req.query.email);
        if (user && ((_a = req.body) === null || _a === void 0 ? void 0 : _a.password) && ((_b = req.body) === null || _b === void 0 ? void 0 : _b.password.length) >= 6) {
            yield (0, user_service_1.update)(user.id, {
                reset_password_token: null,
                password: (_c = req.body) === null || _c === void 0 ? void 0 : _c.password
            });
            return res.status(203).json('Le mot de passe a été modifié !');
        }
        else {
            return next(boom_1.default.badRequest('Erreur : Le serveur rejette le mot de passe incorrect !'));
        }
    });
}
exports.changePwd = changePwd;
function validate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_service_1.findByEmail)(req.query.email);
        if (user && !user.is_validate) {
            yield (0, user_service_1.update)(user.id, {
                validate_account_token: null,
                is_validate: true
            });
            return res.status(302).render('activated');
        }
        else {
            return res.send('Votre compte est déjà activé !');
        }
    });
}
exports.validate = validate;
function version(mode) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(mode === 'android' ? env_config_1.default.android_version : env_config_1.default.ios_version);
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.version = version;
