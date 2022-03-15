"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-temps", (temps) => {
            socket.broadcast.emit("new-temps", temps);
        });
    });
};
