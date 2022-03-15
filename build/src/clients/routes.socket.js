"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-client", (client) => {
            socket.broadcast.emit("new-client", client);
        });
    });
};
