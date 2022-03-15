"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-equipe", (equipe) => {
            socket.broadcast.emit("new-equipe", equipe);
        });
    });
};
