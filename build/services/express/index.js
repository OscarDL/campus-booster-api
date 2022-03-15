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
exports.ExpressErrorHandler = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
function ExpressErrorHandler(err) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        const Errors = err.stack.split('\n');
        const Infos = Errors[1].split(':');
        const fileName = Infos[0].split('/').pop();
        const [col, line] = [Infos[1], Infos[2]];
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom_1.default.internal(err.name));
    });
}
exports.ExpressErrorHandler = ExpressErrorHandler;
class ExpressMiddlewares {
    static NotFound() {
        return (req, res) => {
            return res.status(404).json({
                statusCode: 404,
                message: 'Not Found'
            });
        };
    }
    static ErrorHandler() {
        return (err, req, res, next) => {
            if (err.isBoom) {
                return res.status(err.output.statusCode).json(err.output.payload);
            }
            else {
                return res.status(500).json({
                    statusCode: 500,
                    error: 'Internal',
                    message: `${err.name}: ${err.message}`,
                });
            }
        };
    }
}
exports.default = ExpressMiddlewares;
