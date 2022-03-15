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
exports.remove = exports.update = exports.create = exports.getAll = exports.getById = void 0;
const EquipeMemberService = __importStar(require("../service/equipe-member.service"));
const boom_1 = __importDefault(require("@hapi/boom"));
function getById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield EquipeMemberService.findById(req.query.id));
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.getById = getById;
function getAll(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json(yield EquipeMemberService.findAll({
                limit: (_a = req.query) === null || _a === void 0 ? void 0 : _a.limit
            }));
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.getAll = getAll;
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(201).json(yield EquipeMemberService.create(req.body));
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.create = create;
function update(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(203).json(yield EquipeMemberService.update((_a = req.query) === null || _a === void 0 ? void 0 : _a.id, req.body));
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.update = update;
function remove(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(204).json(yield EquipeMemberService.remove({
                where: {
                    id: (_a = req.query) === null || _a === void 0 ? void 0 : _a.id
                }
            }));
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.remove = remove;
