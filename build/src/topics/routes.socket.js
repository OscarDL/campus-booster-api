"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io) => {
    io.on("connect", (socket) => {
        socket.on("new-topic", (topic) => {
            socket.broadcast.emit("new-topic", topic);
        });
    });
};
