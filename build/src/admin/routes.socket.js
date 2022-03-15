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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("../../services/socket");
exports.default = (io) => {
    // SERVICE status
    io.on('connect', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        // LOGGER
        console.log(`New Client: ${socket.id} -> ${(_a = socket.user) === null || _a === void 0 ? void 0 : _a.firstname} ${(_b = socket.user) === null || _b === void 0 ? void 0 : _b.lastname}`.green);
        socket.emit('connect_success', `Welcome to socket.io ${(_c = socket.user) === null || _c === void 0 ? void 0 : _c.firstname} ${(_d = socket.user) === null || _d === void 0 ? void 0 : _d.lastname}!`);
        io.to((0, socket_1.getAllSocketIdsExceptMe)(io, (_e = socket.user) === null || _e === void 0 ? void 0 : _e.id)).emit('someone-join', (_f = socket.user) === null || _f === void 0 ? void 0 : _f.id);
        socket.emit('list-join', (0, socket_1.getAllUserIdsExpectMe)(io, socket));
        socket.on('disconnect', () => {
            var _a, _b, _c, _d;
            console.log(`Client leave: ${socket.id} -> ${(_a = socket.user) === null || _a === void 0 ? void 0 : _a.firstname} ${(_b = socket.user) === null || _b === void 0 ? void 0 : _b.lastname}`.red);
            io.to((0, socket_1.getAllSocketIdsExceptMe)(io, (_c = socket.user) === null || _c === void 0 ? void 0 : _c.id)).emit('someone-leave', (_d = socket.user) === null || _d === void 0 ? void 0 : _d.id);
        });
    }));
};
