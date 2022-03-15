import { ISocket } from '../types/socket';

export default class SocketProviders {
    static EMIT_AS_PROMISE<T>(socket: ISocket, ev: string, value?: any): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                socket.emit(ev, value);
                socket.on(ev, resolve);
            } catch (err) {
                reject(err);
            }
        });
    }
}