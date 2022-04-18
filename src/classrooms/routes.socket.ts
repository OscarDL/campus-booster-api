import { ISocket, IServer } from "../../types/socket";
import { ClassroomAttributes } from "./model/classroom.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-classroom", (classroom: ClassroomAttributes): void => {
            socket.broadcast.emit("new-classroom", classroom);
        });
    });
}