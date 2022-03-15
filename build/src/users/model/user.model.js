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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const S = __importStar(require("sequelize-typescript"));
const encryption_1 = __importDefault(require("../../../services/encryption"));
const user_interface_1 = require("./user.interface");
const env_config_1 = __importDefault(require("../../../config/env.config"));
const moment_1 = __importDefault(require("moment"));
const UserScope = __importStar(require("./user.scope"));
const topic_user_model_1 = __importDefault(require("../../topic-user/model/topic-user.model"));
const topic_model_1 = __importDefault(require("../../topics/model/topic.model"));
const equipe_member_model_1 = __importDefault(require("../../equipe-members/model/equipe-member.model"));
const equipe_model_1 = __importDefault(require("./../../equipes/model/equipe.model"));
const observation_model_1 = __importDefault(require("./../../observations/model/observation.model"));
const { permissionLevel, cloudinary, MINIMUM_CREATION_ACCOUNT_LEGAL_AGE } = env_config_1.default;
const { Standard } = permissionLevel;
const MIN_DATE = (0, moment_1.default)().subtract(MINIMUM_CREATION_ACCOUNT_LEGAL_AGE, 'years').format('YYYY-MM-DD');
let User = class User extends S.Model {
    // ---------------------
    // @BEFORE CREATE/UPDATE
    // ---------------------
    static encryptPassword(instance) {
        if (instance === null || instance === void 0 ? void 0 : instance.password)
            instance.password = encryption_1.default.cipher(instance === null || instance === void 0 ? void 0 : instance.password);
    }
    // -----------
    // @AFTER FIND
    // -----------
    static decryptPasswords(instance) {
        if (Array.isArray(instance)) {
            instance.forEach(i => {
                if (i === null || i === void 0 ? void 0 : i.password)
                    i.password = encryption_1.default.decipher(i === null || i === void 0 ? void 0 : i.password);
            });
        }
        else {
            if (instance === null || instance === void 0 ? void 0 : instance.password)
                instance.password = encryption_1.default.decipher(instance === null || instance === void 0 ? void 0 : instance.password);
        }
    }
};
__decorate([
    S.PrimaryKey,
    S.AutoIncrement,
    S.Column(S.DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.STRING(50)),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.STRING(50)),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    S.Is('emailFormat', (email) => {
        if (!user_interface_1.EMAIL_REGEX.test(email)) {
            throw new Error(`'${email}' is not a correct email format.`);
        }
    }),
    S.Unique,
    S.AllowNull(false),
    S.Column(S.DataType.STRING(50)),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.STRING(255)),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    S.AllowNull(true),
    S.IsDate,
    S.IsBefore(MIN_DATE),
    S.Column(S.DataType.DATE),
    __metadata("design:type", String)
], User.prototype, "birthday", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.STRING(255)),
    __metadata("design:type", String)
], User.prototype, "validate_account_token", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.STRING(255)),
    __metadata("design:type", String)
], User.prototype, "reset_password_token", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.STRING(255)),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    S.Default(false),
    S.Column(S.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], User.prototype, "is_validate", void 0);
__decorate([
    S.Default(Standard),
    S.Column(S.DataType.INTEGER),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    S.AllowNull(true),
    S.Default(cloudinary.Avatar.default),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "avatar_public_id", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], User.prototype, "firebase_push_token", void 0);
__decorate([
    S.HasMany(() => observation_model_1.default, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], User.prototype, "Observations", void 0);
__decorate([
    S.BelongsToMany(() => topic_model_1.default, () => topic_user_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "Topics", void 0);
__decorate([
    S.BelongsToMany(() => equipe_model_1.default, () => equipe_member_model_1.default),
    __metadata("design:type", Array)
], User.prototype, "Equipes", void 0);
__decorate([
    S.BeforeCreate,
    S.BeforeUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", void 0)
], User, "encryptPassword", null);
__decorate([
    S.AfterFind,
    S.AfterCreate,
    S.AfterUpdate,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], User, "decryptPasswords", null);
User = __decorate([
    S.Scopes(UserScope.default),
    S.Table({
        timestamps: true,
        underscored: false,
        tableName: 'salariés',
        schema: 'public'
    })
], User);
exports.default = User;
