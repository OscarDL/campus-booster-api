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
const ContratScope = __importStar(require("./contrat.scope"));
const client_model_1 = __importDefault(require("./../../clients/model/client.model"));
const option_model_1 = __importDefault(require("./../../options/model/option.model"));
const temps_model_1 = __importDefault(require("./../../temps/model/temps.model"));
const prevision_model_1 = __importDefault(require("./../../previsions/model/prevision.model"));
// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
let Contrat = class Contrat extends S.Model {
    constructor() {
        super(...arguments);
        this.Options = [];
        this.Temps = [];
        this.Previsions = [];
    }
};
__decorate([
    S.PrimaryKey,
    S.AutoIncrement,
    S.Column(S.DataType.INTEGER),
    __metadata("design:type", Number)
], Contrat.prototype, "id", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], Contrat.prototype, "num_contrat", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], Contrat.prototype, "description", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.FLOAT),
    __metadata("design:type", Number)
], Contrat.prototype, "montant_ht", void 0);
__decorate([
    S.AllowNull(true),
    S.Column(S.DataType.TEXT),
    __metadata("design:type", String)
], Contrat.prototype, "pdf_url", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.DATE),
    __metadata("design:type", Date)
], Contrat.prototype, "start_date", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.DATE),
    __metadata("design:type", Date)
], Contrat.prototype, "end_date", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.FLOAT),
    __metadata("design:type", Number)
], Contrat.prototype, "taux_horaire", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.FLOAT),
    __metadata("design:type", Number)
], Contrat.prototype, "remaining_time", void 0);
__decorate([
    S.AllowNull(false),
    S.Column(S.DataType.FLOAT),
    __metadata("design:type", Number)
], Contrat.prototype, "total_time", void 0);
__decorate([
    S.Column,
    S.ForeignKey(() => client_model_1.default),
    __metadata("design:type", Number)
], Contrat.prototype, "client_id", void 0);
__decorate([
    S.BelongsTo(() => client_model_1.default, {
        foreignKey: 'client_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", client_model_1.default)
], Contrat.prototype, "Client", void 0);
__decorate([
    S.HasMany(() => option_model_1.default, {
        foreignKey: 'contrat_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Contrat.prototype, "Options", void 0);
__decorate([
    S.HasMany(() => temps_model_1.default, {
        foreignKey: 'contrat_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Contrat.prototype, "Temps", void 0);
__decorate([
    S.HasMany(() => prevision_model_1.default, {
        foreignKey: 'contrat_id',
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Contrat.prototype, "Previsions", void 0);
Contrat = __decorate([
    S.Scopes(ContratScope.default),
    S.Table({
        timestamps: true,
        underscored: false,
        tableName: 'contrats',
        schema: 'public'
    })
], Contrat);
exports.default = Contrat;
