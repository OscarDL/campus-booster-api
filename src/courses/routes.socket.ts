import { ISocket } from "../../types/socket";
import { CourseAttributes } from "./model/course.interface";
export default (socket: ISocket): void => {
    socket.on("new-course", (course: CourseAttributes): void => {
        socket.broadcast.emit("new-course", course);
    });
}