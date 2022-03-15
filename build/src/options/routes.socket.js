"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-option", (option) => {
            socket.broadcast.emit("new-option", option);
        });
    });
};
