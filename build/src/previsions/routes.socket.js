"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-prevision", (prevision) => {
            socket.broadcast.emit("new-prevision", prevision);
        });
    });
};
