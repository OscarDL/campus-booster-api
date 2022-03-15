"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-equipemember", (equipemember) => {
            socket.broadcast.emit("new-equipemember", equipemember);
        });
    });
};
