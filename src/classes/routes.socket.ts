import { ISocket, IServer } from "../../types/socket";
import { ClasseAttributes } from "./model/classe.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-classe", (classe: ClasseAttributes): void => {
            socket.broadcast.emit("new-classe", classe);
        });
    });
}