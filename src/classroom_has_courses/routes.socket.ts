import { ISocket, IServer } from "../../types/socket";
import { ClassroomHasCourseAttributes } from "./model/classroomhascourse.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-classroomhascourse", (classroomhascourse: ClassroomHasCourseAttributes): void => {
            socket.broadcast.emit("new-classroomhascourse", classroomhascourse);
        });
    });
}