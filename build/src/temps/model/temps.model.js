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
const contrat_model_1 = __importDefault(require("../../contrats/model/contrat.model"));
const TempsScope = __importStar(require("./temps.scope"));
const equipe_model_1 = __importDefault(require("./../../equipes/model/equipe.model"));
const observation_model_1 = __importDefault(require("./../../observations/model/observation.model"));
// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
let Temps = class Temps extends S.Model {
};
__decorate([
    S.PrimaryKey,
    S.AutoIncrement,
    S.Column(S.DataType.INTEGER),
    __metadata("design:type", Number)
], Temps.prototype, "id", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.FLOAT),
    __metadata("design:type", Number)
], Temps.prototype, "heures", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.TIME),
    __metadata("design:type", String)
], Temps.prototype, "date", void 0);
__decorate([
    S.AllowNull(false),
    S.Default(false),
    S.Column(S.DataType.BOOLEAN),
    __metadata("design:type", Boolean)
], Temps.prototype, "intervenant_externe", void 0);
__decorate([
    S.Column,
    S.ForeignKey(() => contrat_model_1.default),
    __metadata("design:type", Number)
], Temps.prototype, "contrat_id", void 0);
__decorate([
    S.BelongsTo(() => contrat_model_1.default, {
        foreignKey: 'contrat_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", contrat_model_1.default)
], Temps.prototype, "Contrat", void 0);
__decorate([
    S.Column,
    S.ForeignKey(() => equipe_model_1.default),
    __metadata("design:type", Number)
], Temps.prototype, "equipe_id", void 0);
__decorate([
    S.BelongsTo(() => equipe_model_1.default, {
        foreignKey: 'equipe_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", equipe_model_1.default)
], Temps.prototype, "Equipe", void 0);
__decorate([
    S.HasMany(() => observation_model_1.default, {
        foreignKey: 'temps_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Temps.prototype, "Observations", void 0);
Temps = __decorate([
    S.Scopes(TempsScope.default),
    S.Table({
        timestamps: true,
        underscored: false,
        tableName: 'temps',
        schema: 'public'
    })
], Temps);
exports.default = Temps;
