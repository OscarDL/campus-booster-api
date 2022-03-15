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
exports.paramParameterHoped = exports.bodyParameterHoped = exports.queryParameterHoped = exports.bodyParametersNeeded = exports.paramParametersNeeded = exports.queryParametersNeeded = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const express_1 = require("../../../services/express");
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const checkType = (data, type, enumOptions) => {
    switch (type) {
        case 'enum':
            return (enumOptions.some(e => e == data));
        case 'integer':
            return (typeof data === 'number' &&
                Number.isInteger(Number(data)) &&
                Math.floor(Number(data)) === Number(data) &&
                Number(data) >= 0 &&
                Number(data).toString().length <= 9);
        case 'float':
            return (typeof data === 'number' &&
                parseFloat(`${data}`) === data &&
                (/^\d*(\.\d+)?$/.test(`${data}`)));
        case 'string':
            return (typeof data === 'string');
        case 'array':
            return (typeof data === 'object' && Array.isArray(data));
        case 'object':
            return (typeof data === 'object' && !Array.isArray(data));
        case 'boolean':
            return (typeof data === 'boolean');
        case 'email':
            return (typeof data === 'string' && EMAIL_REGEX.test(data));
        case 'date':
            return (typeof data === "string" && new Date(data).toString() != "Invalid Date");
        default:
            throw new Error('Type de paramètre inconnu.');
    }
};
const parseNumber = (p) => {
    return (typeof p === 'string' && !(/^\d*(\.\d+)?$/.test(p))) ? NaN : parseFloat(p);
};
function queryParametersNeeded(params, type, enumOptions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (typeof params === 'string') {
                return (req.query[params]) ?
                    (checkType((['float', 'integer'].includes(type)) ? parseNumber(req.query[params]) : req.query[params], type, enumOptions)) ?
                        next() :
                        next(boom_1.default.badRequest(`Format incorrect pour ${params} !`)) :
                    next(boom_1.default.badRequest(`Argument manquant ${params} dans la requête !`));
            }
            else if (typeof params === 'object' && Array.isArray(params)) {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if (!req.query[param]) {
                        return next(boom_1.default.badRequest(`Argument manquant ${param} dans la requête !`));
                    }
                    else if (!checkType((['float', 'integer'].includes(type)) ? parseNumber(req.query[param]) : req.query[param], type, enumOptions)) {
                        return next(boom_1.default.badRequest(`Format incorrect pour ${param} !`));
                    }
                }
                return next();
            }
            else {
                return next(boom_1.default.badGateway('Erreur du serveur : les paramètres de requête doivent être au format String ou Array[String].'));
            }
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.queryParametersNeeded = queryParametersNeeded;
function paramParametersNeeded(params, type, enumOptions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (typeof params === 'string') {
                return (req.params[params]) ?
                    (checkType((['float', 'integer'].includes(type)) ? parseNumber(req.params[params]) : req.params[params], type, enumOptions)) ?
                        next() :
                        next(boom_1.default.badRequest(`Format incorrect pour ${params} !`)) :
                    next(boom_1.default.badRequest(`Argument manquant ${params} comme paramètre !`));
            }
            else if (typeof params === 'object' && Array.isArray(params)) {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if (!req.params[param]) {
                        return next(boom_1.default.badRequest(`Argument manquant ${param} comme paramètre !`));
                    }
                    else if (!checkType((['float', 'integer'].includes(type)) ? parseNumber(req.params[param]) : req.params[param], type, enumOptions)) {
                        return next(boom_1.default.badRequest(`Format incorrect pour ${param} !`));
                    }
                }
                return next();
            }
            else {
                return next(boom_1.default.badGateway('Erreur du serveur : les paramètres de paramètre doivent être au format String ou Array[String].'));
            }
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.paramParametersNeeded = paramParametersNeeded;
function bodyParametersNeeded(params, type, enumOptions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (typeof params === 'string') {
                return (req.body[params] || [false, 0].includes(req.body[params])) ?
                    (checkType(req.body[params], type, enumOptions)) ?
                        next() :
                        next(boom_1.default.badRequest(`Format incorrect pour ${params} !`)) :
                    next(boom_1.default.badRequest(`Argument manquant ${params} dans le body !`));
            }
            else if (typeof params === 'object' && Array.isArray(params)) {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if (!req.body[param] && ![false, 0].includes(req.body[param])) {
                        return next(boom_1.default.badRequest(`Argument manquant ${param} dans le body !`));
                    }
                    else if (!checkType(req.body[param], type, enumOptions) && ![false, 0].includes(req.body[param])) {
                        return next(boom_1.default.badRequest(`Format incorrect pour ${param} !`));
                    }
                }
                next();
            }
            else {
                return next(boom_1.default.badGateway('Erreur du serveur : les paramètres du body doivent être au format String ou Array[String].'));
            }
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.bodyParametersNeeded = bodyParametersNeeded;
/////// HOPE ////////
function queryParameterHoped(param, type, enumOptions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            return (req.query[param]) ? queryParametersNeeded(param, type, enumOptions)(req, res, next) : next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.queryParameterHoped = queryParameterHoped;
function bodyParameterHoped(param, type, enumOptions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            return (req.body[param]) ? bodyParametersNeeded(param, type, enumOptions)(req, res, next) : next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.bodyParameterHoped = bodyParameterHoped;
function paramParameterHoped(param, type, enumOptions) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            return (req.params[param]) ? paramParametersNeeded(param, type, enumOptions)(req, res, next) : next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.paramParameterHoped = paramParameterHoped;
