"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-observation", (observation) => {
            socket.broadcast.emit("new-observation", observation);
        });
    });
};
