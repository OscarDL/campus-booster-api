"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SocketProviders {
    static EMIT_AS_PROMISE(socket, ev, value) {
        return new Promise((resolve, reject) => {
            try {
                socket.emit(ev, value);
                socket.on(ev, resolve);
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
exports.default = SocketProviders;
