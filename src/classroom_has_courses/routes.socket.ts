import { ISocket } from "../../types/socket";
import { ClassroomHasCourseAttributes } from "./model/classroomhascourse.interface";
export default (socket: ISocket): void => {
    socket.on("new-classroomhascourse", (classroomhascourse: ClassroomHasCourseAttributes): void => {
        socket.broadcast.emit("new-classroomhascourse", classroomhascourse);
    });
}