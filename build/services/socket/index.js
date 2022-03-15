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
exports.getAllUserIdsExpectMe = exports.getAllSocketIdsExceptMe = exports.getSocketIdByUserId = exports.authSocketMidddleware = void 0;
const UserService = __importStar(require("../../src/users/service/user.service"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const boom_1 = __importDefault(require("@hapi/boom"));
const { permissionLevel } = env_config_1.default;
/**
 * This socket.io middleware enable security auth to client sockets.
 * @param io - Socket.io server
 * @return void
 */
function authSocketMidddleware(io) {
    io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const token = ((_b = (_a = socket.handshake.auth) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.split(' ')) || [];
            if (token[0] !== 'Bearer') {
                return next(boom_1.default.badRequest('You need to provide a Bearer token'));
            }
            else {
                try {
                    socket.jwt = jsonwebtoken_1.default.verify(token[1], env_config_1.default.jwtSecret, env_config_1.default.jwtOptions);
                    socket.user = yield UserService.findById((_c = socket.jwt) === null || _c === void 0 ? void 0 : _c.id, {}, 'all');
                    if (socket.user &&
                        socket.user.role &&
                        socket.user.is_validate) {
                        socket.isAdmin = [
                            permissionLevel.Admin,
                            permissionLevel.Boss
                        ].includes(socket.user.role);
                        socket.connected = true;
                        return next();
                    }
                    else {
                        socket.connected = false;
                        return next(boom_1.default.unauthorized('Unauthorize.'));
                    }
                }
                catch (err) {
                    console.log(`${err}`.error);
                    return next(boom_1.default.unauthorized(err));
                }
            }
        }
        catch (err) {
            console.log(`${err}`.error);
            return next(boom_1.default.badRequest(err));
        }
    }));
}
exports.authSocketMidddleware = authSocketMidddleware;
/**
 * Get socket ID by user ID
 * @param io - Socket.io server
 * @param userIDs - The id(s) of user(s)
 * @return string[]
 */
function getSocketIdByUserId(io, userIDs) {
    const sockets = Array.from(io.sockets.sockets.values());
    const ids = sockets.filter(s => { var _a; return (s === null || s === void 0 ? void 0 : s.connected) && userIDs.includes((_a = s === null || s === void 0 ? void 0 : s.user) === null || _a === void 0 ? void 0 : _a.id); }).map(s => s.id);
    return ids.length ? ids : null;
}
exports.getSocketIdByUserId = getSocketIdByUserId;
/**
 * Get all sockets connected except my socket(s).
 * @param io - Socket.io server
 * @param user_id - Your user ID
 * @return string[]
 */
function getAllSocketIdsExceptMe(io, user_id) {
    const sockets = Array.from(io.sockets.sockets.values());
    const ids = sockets.filter(s => { var _a; return s.connected && ((_a = s.user) === null || _a === void 0 ? void 0 : _a.id) !== user_id; }).map(s => s.id);
    return user_id && ids.length ? ids : null;
}
exports.getAllSocketIdsExceptMe = getAllSocketIdsExceptMe;
/**
 * Get all sockets connected except my socket(s).
 * @param io - Socket.io server
 * @param socket - The socket.io client
 * @return number[]
 */
function getAllUserIdsExpectMe(io, socket) {
    const sockets = Array.from(io.sockets.sockets.values());
    return sockets.map(s => { var _a; return (_a = s.user) === null || _a === void 0 ? void 0 : _a.id; }).filter(id => { var _a; return id !== ((_a = socket.user) === null || _a === void 0 ? void 0 : _a.id); });
}
exports.getAllUserIdsExpectMe = getAllUserIdsExpectMe;
