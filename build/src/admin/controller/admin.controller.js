"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const boom_1 = __importDefault(require("@hapi/boom"));
const getMethod = (methods) => {
    const keys = Object.keys(methods);
    return keys.find(k => k);
};
function routes(app) {
    return (req, res, next) => {
        try {
            const routes = app._router.stack;
            return res.status(200).json(routes.map(r => {
                var _a;
                if (((_a = r.route) === null || _a === void 0 ? void 0 : _a.path) && getMethod(r.route.methods)) {
                    return {
                        path: r.route.path,
                        method: getMethod(r.route.methods)
                    };
                }
            }).filter(r => r));
        }
        catch (err) {
            return next(err.isBoom ? err : boom_1.default.internal(err.name));
        }
    };
}
exports.routes = routes;
