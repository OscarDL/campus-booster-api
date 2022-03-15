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
exports.getFirebaseUsers = exports.rmToken = exports.pushToken = exports.checkPassword = exports.emailTaken = exports.remove = exports.update = exports.validate = exports.create = exports.search = exports.getMe = exports.getById = exports.getAll = void 0;
const UserService = __importStar(require("../service/user.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
const crypto_1 = __importDefault(require("crypto"));
const cloudinary_1 = __importDefault(require("../../../services/cloudinary"));
const models_config_1 = require("../../../config/models.config");
const express_1 = require("../../../services/express");
const mailing_1 = __importDefault(require("../../../services/mailing"));
const Mailer = new mailing_1.default();
const env_config_1 = __importDefault(require("../../../config/env.config"));
const { permissionLevel: { Standard } } = env_config_1.default;
// import FirebaseService from '../../../services/firebase';
// (async() => {
//     await FirebaseService.sendToDevices(
//         (await UserService.findOne({ where: { email: 'ulysse@euranov.com'}}))?.firebase_push_token!,
//         'coucou',
//         "c'est moi",
//         {}
//     )
// })();
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield UserService.findAll({
                limit: req.query.limit,
            }, 'all'));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.getAll = getAll;
function getById(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield UserService.findById((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, {}, 'all'));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.getById = getById;
function getMe(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield UserService.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
                where: {
                    is_validate: {
                        [models_config_1.Op.not]: false,
                    }
                }
            }, [
                'defaultScope'
            ]));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.getMe = getMe;
function search(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield UserService.findAll({
                where: {
                    [models_config_1.Op.and]: [
                        (req.query.search) ? {
                            [models_config_1.Op.or]: [
                                models_config_1.Sequelize.where(models_config_1.Sequelize.fn('concat', models_config_1.Sequelize.fn("lower", models_config_1.Sequelize.col("firstname")), " ", models_config_1.Sequelize.fn("lower", models_config_1.Sequelize.col("lastname"))), {
                                    [models_config_1.Op.like]: '%' + req.query.search.toLocaleLowerCase() + '%'
                                }),
                                models_config_1.Sequelize.where(models_config_1.Sequelize.fn("lower", models_config_1.Sequelize.col("email")), {
                                    [models_config_1.Op.like]: '%' + req.query.search.toLocaleLowerCase() + '%'
                                })
                            ]
                        } : {},
                        {
                            is_validate: true
                        }
                    ]
                },
                limit: req.query.limit,
                offset: req.query.offset,
                order: [
                    ['createdAt', 'ASC']
                ]
            }, 'defaultScope'));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.search = search;
function create(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // CREATE USER AVATAR
            if (req.file) {
                const avatar = yield cloudinary_1.default.uploadFile(req.file, 'users');
                if (avatar) {
                    [
                        req.body.avatar,
                        req.body.avatar_public_id
                    ] = [
                        avatar.link,
                        avatar.public_id
                    ];
                }
            }
            // CREATE USER
            const user = yield UserService.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
                avatar: req.body.avatar,
                role: (_a = req.body.role) !== null && _a !== void 0 ? _a : Standard,
                is_validate: (_b = req.body.is_validate) !== null && _b !== void 0 ? _b : true,
                avatar_public_id: req.body.avatar_public_id
            });
            return (req.user) ? res.status(201).json(user) : next();
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.create = create;
function validate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield UserService.findByEmail(req.body.email);
            if (user) {
                // create token for refreshing password
                const token = crypto_1.default.randomBytes(30).toString('hex');
                // update user status
                yield user.update({
                    is_validate: false,
                    validate_account_token: token
                });
                // send email
                if (yield Mailer.custom('validate-account', {
                    email: req.body.email,
                    origin: req.headers.origin,
                    token: token,
                    username: `${user.firstname} ${user.lastname}`
                })) {
                    return res.status(200).json({
                        created: true,
                        user: user,
                        message: `You have received an email at ${req.body.email} to validate your account.`
                    });
                }
                else {
                    yield user.update({
                        is_validate: true
                    });
                    return next(boom_1.default.badRequest(`Server cannot send email to ${req.body.email} for the moment!`));
                }
            }
            else {
                return next(boom_1.default.badRequest(`The user with email ${req.body.email} has not been created, please retry.`));
            }
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.validate = validate;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // UPDATE USER AVATAR
            const oldUser = yield UserService.findById(req.query.user_id, {}, 'all');
            if (req.file) {
                const avatar = yield cloudinary_1.default.uploadFile(req.file, 'users');
                if (avatar) {
                    [
                        req.body.avatar,
                        req.body.avatar_public_id
                    ] = [
                        avatar.link,
                        avatar.public_id
                    ];
                }
                if (oldUser === null || oldUser === void 0 ? void 0 : oldUser.avatar_public_id) {
                    yield cloudinary_1.default.destroy(oldUser === null || oldUser === void 0 ? void 0 : oldUser.avatar_public_id);
                }
            }
            // UPDATE USER
            const user = yield UserService.update(oldUser === null || oldUser === void 0 ? void 0 : oldUser.id, req.body);
            return res.status(203).json(user);
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.update = update;
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // DELETE USER AVATAR
            const user = yield UserService.findById(req.query.user_id, {}, 'all');
            if (user === null || user === void 0 ? void 0 : user.avatar_public_id) {
                yield cloudinary_1.default.destroy(user === null || user === void 0 ? void 0 : user.avatar_public_id);
            }
            return res.status(204).json(yield UserService.remove({
                where: {
                    id: user === null || user === void 0 ? void 0 : user.id,
                }
            }));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.remove = remove;
function emailTaken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(!!(yield UserService.count({
                where: {
                    is_validate: {
                        [models_config_1.Op.not]: false
                    },
                    email: req.query.search
                }
            })));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.emailTaken = emailTaken;
function checkPassword(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(((_a = req.user) === null || _a === void 0 ? void 0 : _a.password) &&
                req.query.password === req.user.password);
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.checkPassword = checkPassword;
function pushToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(!!(yield UserService.update((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
                firebase_push_token: req.body.token
            }, 'onlyID')));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.pushToken = pushToken;
function rmToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(!!(yield UserService.update((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
                firebase_push_token: null
            }, 'onlyID')));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.rmToken = rmToken;
function getFirebaseUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield UserService.findAll({
                where: {
                    firebase_push_token: {
                        [models_config_1.Op.not]: null
                    }
                },
                limit: req.query.limit,
                offset: req.query.offset,
                order: [
                    ['createdAt', 'ASC']
                ]
            }, 'defaultScope'));
        }
        catch (err) {
            return yield (0, express_1.ExpressErrorHandler)(err)(req, res, next);
        }
    });
}
exports.getFirebaseUsers = getFirebaseUsers;
