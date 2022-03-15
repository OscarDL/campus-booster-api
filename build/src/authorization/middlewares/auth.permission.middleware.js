"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.minimunCreationAccountLegalAge = exports.iMustBe = exports.onlySuperAdmin = exports.onlySameUserOrSuperAdmin = exports.onlySameUserOrAdmin = exports.minimumRoleRequired = void 0;
const env_config_1 = __importDefault(require("../../../config/env.config"));
const { permissionLevel, app_name } = env_config_1.default;
const boom_1 = __importDefault(require("@hapi/boom"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
function minimumRoleRequired(required_role = 0) {
    return (req, res, next) => {
        var _a, _b, _c;
        try {
            if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.is_validate) {
                const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
                if (userRole && userRole >= required_role && userRole <= permissionLevel.Boss && Object.values(permissionLevel).includes(userRole)) {
                    req.isAdmin = ([permissionLevel.Admin, permissionLevel.Boss].includes(userRole)) ? true : false;
                    return next();
                }
                else {
                    if (!userRole) {
                        return next(boom_1.default.forbidden(`Vous avez été banni de ${app_name}.`));
                    }
                    else {
                        return next(boom_1.default.badRequest('Vous ne pouvez pas effectuer cette action, vos droits d\'accès ne sont pas suffisants.'));
                    }
                }
            }
            else {
                return next(boom_1.default.notAcceptable(`Vous avez reçu un email à ${(_c = req.user) === null || _c === void 0 ? void 0 : _c.email} pour valider votre compte.`, { shouldBeActivated: true }));
            }
        }
        catch (e) {
            console.log(`${e}`.error);
            return next(boom_1.default.unauthorized('Votre session est invalide !'));
        }
    };
}
exports.minimumRoleRequired = minimumRoleRequired;
function onlySameUserOrAdmin(req, res, next) {
    var _a, _b, _c, _d;
    try {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.is_validate) {
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            const user_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (userRole && [permissionLevel.Admin, permissionLevel.Boss].includes(userRole)) {
                req.isAdmin = true;
                return next();
            }
            else {
                if (req.query && req.query.user_id) {
                    if (userRole && user_id === parseInt(req.query.user_id)) {
                        req.isAdmin = ([permissionLevel.Admin, permissionLevel.Boss].includes(userRole)) ? true : false;
                        return next();
                    }
                    else {
                        if (!userRole) {
                            return next(boom_1.default.forbidden(`Vous avez été banni de ${app_name}.`));
                        }
                        else {
                            return next(boom_1.default.badRequest('Vous ne pouvez pas effectuer cette action, vos droits d\'accès ne sont pas suffisants.'));
                        }
                    }
                }
                else {
                    return next(boom_1.default.badRequest('Le paramètre user_id est manquant dans la requête.'));
                }
            }
        }
        else {
            return next(boom_1.default.notAcceptable(`Vous avez reçu un email à ${(_d = req.user) === null || _d === void 0 ? void 0 : _d.email} pour valider votre compte.`, { shouldBeActivated: true }));
        }
    }
    catch (e) {
        console.log(`${e}`.error);
        return next(boom_1.default.unauthorized('Votre session est invalide !'));
    }
}
exports.onlySameUserOrAdmin = onlySameUserOrAdmin;
function onlySameUserOrSuperAdmin(req, res, next) {
    var _a, _b, _c, _d;
    try {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.is_validate) {
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            const user_id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (permissionLevel.Boss === userRole) {
                req.isAdmin = true;
                return next();
            }
            else {
                if (req.query && req.query.user_id) {
                    if (user_id === parseInt(req.query.user_id)) {
                        req.isAdmin = (permissionLevel.Boss === userRole) ? true : false;
                        return next();
                    }
                    else {
                        if (!userRole) {
                            return next(boom_1.default.forbidden(`Vous avez été banni de ${app_name}.`));
                        }
                        else {
                            return next(boom_1.default.badRequest('Vous ne pouvez pas effectuer cette action, vos droits d\'accès ne sont pas suffisants.'));
                        }
                    }
                }
                else {
                    return next(boom_1.default.badRequest('Le paramètre user_id est manquant dans la requête.'));
                }
            }
        }
        else {
            return next(boom_1.default.notAcceptable(`Vous avez reçu un email à ${(_d = req.user) === null || _d === void 0 ? void 0 : _d.email} pour valider votre compte.`, { shouldBeActivated: true }));
        }
    }
    catch (e) {
        console.log(`${e}`.error);
        return next(boom_1.default.unauthorized('Votre session est invalide !'));
    }
}
exports.onlySameUserOrSuperAdmin = onlySameUserOrSuperAdmin;
function onlySuperAdmin(req, res, next) {
    var _a, _b, _c;
    try {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.is_validate) {
            const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
            if (userRole === permissionLevel.Boss) {
                req.isAdmin = true;
                return next();
            }
            else {
                if (!userRole) {
                    return next(boom_1.default.forbidden(`Vous avez été banni de ${app_name}.`));
                }
                else {
                    return next(boom_1.default.badRequest('Vous ne pouvez pas effectuer cette action, vos droits d\'accès ne sont pas suffisants.'));
                }
            }
        }
        else {
            return next(boom_1.default.notAcceptable(`Vous avez reçu un email à ${(_c = req.user) === null || _c === void 0 ? void 0 : _c.email} pour valider votre compte.`, { shouldBeActivated: true }));
        }
    }
    catch (e) {
        console.log(`${e}`.error);
        return next(boom_1.default.unauthorized('Votre session est invalide !'));
    }
}
exports.onlySuperAdmin = onlySuperAdmin;
function iMustBe(roles) {
    return (req, res, next) => {
        var _a, _b, _c;
        try {
            if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.is_validate) {
                const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
                if (userRole && Array.isArray(roles) ? roles.includes(userRole) : userRole === roles) {
                    req.isAdmin = ([permissionLevel.Admin, permissionLevel.Boss].includes(userRole)) ? true : false;
                    return next();
                }
                else {
                    if (!userRole) {
                        return next(boom_1.default.forbidden(`Vous avez été banni de ${app_name}.`));
                    }
                    else {
                        return next(boom_1.default.badRequest('Vous ne pouvez pas effectuer cette action, vos droits d\'accès ne sont pas suffisants.'));
                    }
                }
            }
            else {
                return next(boom_1.default.notAcceptable(`Vous avez reçu un email à ${(_c = req.user) === null || _c === void 0 ? void 0 : _c.email} pour valider votre compte.`, { shouldBeActivated: true }));
            }
        }
        catch (e) {
            console.log(`${e}`.error);
            return next(boom_1.default.unauthorized('Votre session est invalide !'));
        }
    };
}
exports.iMustBe = iMustBe;
function minimunCreationAccountLegalAge(req, res, next) {
    var _a;
    if (req.body.birthday && (0, moment_timezone_1.default)().diff((0, moment_timezone_1.default)((_a = req.body) === null || _a === void 0 ? void 0 : _a.birthday), 'years') < env_config_1.default.MINIMUM_CREATION_ACCOUNT_LEGAL_AGE) {
        return next(boom_1.default.forbidden(`You must have at least ${env_config_1.default.MINIMUM_CREATION_ACCOUNT_LEGAL_AGE} years old to perform this action.`));
    }
    return next();
}
exports.minimunCreationAccountLegalAge = minimunCreationAccountLegalAge;
