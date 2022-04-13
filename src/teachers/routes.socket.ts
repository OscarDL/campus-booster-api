import { ISocket, IServer } from "../../types/socket";
import { TeacherAttributes } from "./model/teacher.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-teacher", (teacher: TeacherAttributes): void => {
            socket.broadcast.emit("new-teacher", teacher);
        });
    });
}