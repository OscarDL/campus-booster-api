import { ISocket } from "../../types/socket";
import { TeacherAttributes } from "./model/teacher.interface";
export default (socket: ISocket): void => {
    socket.on("new-teacher", (teacher: TeacherAttributes): void => {
        socket.broadcast.emit("new-teacher", teacher);
    });
}