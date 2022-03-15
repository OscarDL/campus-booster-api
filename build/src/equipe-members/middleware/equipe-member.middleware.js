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
exports.equipememberExistAsParam = exports.equipememberExistAsBody = exports.equipememberExistAsQuery = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const equipe_member_service_1 = require("../service/equipe-member.service");
function equipememberExistAsQuery(name) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.query[name]) {
                const equipemember = yield (0, equipe_member_service_1.findById)(req.query[name]);
                return (!equipemember) ? next(boom_1.default.badRequest(`EquipeMember does not exist!`)) : next();
            }
            return next();
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.equipememberExistAsQuery = equipememberExistAsQuery;
function equipememberExistAsBody(name) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.body[name]) {
                const equipemember = yield (0, equipe_member_service_1.findById)(req.body[name]);
                return (!equipemember) ? next(boom_1.default.badRequest(`EquipeMember does not exist!`)) : next();
            }
            return next();
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.equipememberExistAsBody = equipememberExistAsBody;
function equipememberExistAsParam(name) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (req.params[name]) {
                const equipemember = yield (0, equipe_member_service_1.findById)(req.params[name]);
                return (!equipemember) ? next(boom_1.default.badRequest(`EquipeMember does not exist!`)) : next();
            }
            return next();
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    });
}
exports.equipememberExistAsParam = equipememberExistAsParam;
