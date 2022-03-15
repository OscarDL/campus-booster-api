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
// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
const S = __importStar(require("sequelize-typescript"));
const contrat_model_1 = __importDefault(require("../../contrats/model/contrat.model"));
const PrevisionScope = __importStar(require("./prevision.scope"));
let Prevision = class Prevision extends S.Model {
};
__decorate([
    S.PrimaryKey,
    S.AutoIncrement,
    S.Column(S.DataType.INTEGER),
    __metadata("design:type", Number)
], Prevision.prototype, "id", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.TIME),
    __metadata("design:type", String)
], Prevision.prototype, "start_date", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.TIME),
    __metadata("design:type", String)
], Prevision.prototype, "end_date", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.FLOAT),
    __metadata("design:type", Number)
], Prevision.prototype, "heures", void 0);
__decorate([
    S.AllowNull(true),
    S.Default("incoming"),
    S.Column(S.DataType.STRING(255)),
    __metadata("design:type", String)
], Prevision.prototype, "status", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], Prevision.prototype, "description", void 0);
__decorate([
    S.Column,
    S.ForeignKey(() => contrat_model_1.default),
    __metadata("design:type", Number)
], Prevision.prototype, "contrat_id", void 0);
__decorate([
    S.BelongsTo(() => contrat_model_1.default, {
        foreignKey: 'contrat_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", contrat_model_1.default)
], Prevision.prototype, "Contrat", void 0);
Prevision = __decorate([
    S.Scopes(PrevisionScope.default),
    S.Table({
        timestamps: true,
        underscored: false,
        tableName: 'previsions',
        schema: 'public'
    })
], Prevision);
exports.default = Prevision;
