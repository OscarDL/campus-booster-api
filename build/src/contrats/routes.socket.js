"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-contrat", (contrat) => {
            socket.broadcast.emit("new-contrat", contrat);
        });
    });
};
