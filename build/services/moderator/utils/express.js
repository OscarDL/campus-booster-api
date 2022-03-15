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
const boom_1 = __importDefault(require("@hapi/boom"));
const __1 = __importDefault(require(".."));
var ExpressModerator;
(function (ExpressModerator) {
    const langs = ['french', 'english', 'italian', 'spanish'];
    function censorFor(...field) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const moderator = new __1.default(...langs);
                yield moderator.ready();
                for (let i = 0; i < field.length; i++) {
                    const f = field[i];
                    if (req.body[f.toString()]) {
                        req.body[f.toString()] = moderator.censor(req.body[f.toString()]);
                    }
                }
                return next();
            }
            catch (err) {
                console.log(`${err}`.error);
                return next(err.isBoom ? err : boom_1.default.internal(err.name));
            }
        });
    }
    ExpressModerator.censorFor = censorFor;
    function blockFor(...field) {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const moderator = new __1.default(...langs);
                yield moderator.ready();
                for (let i = 0; i < field.length; i++) {
                    const f = field[i];
                    if (req.body[f.toString()] && ((_a = moderator.detect(req.body[f.toString()])) === null || _a === void 0 ? void 0 : _a.length)) {
                        return next(boom_1.default.badRequest(`Sorry but the ${f} field seems to be an insult.`));
                    }
                }
                return next();
            }
            catch (err) {
                console.log(`${err}`.error);
                return next(err.isBoom ? err : boom_1.default.internal(err.name));
            }
        });
    }
    ExpressModerator.blockFor = blockFor;
})(ExpressModerator || (ExpressModerator = {}));
exports.default = ExpressModerator;
