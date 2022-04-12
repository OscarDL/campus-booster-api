import { ISocket, IServer } from "../../types/socket";
import { CourseAttributes } from "./model/course.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-course", (course: CourseAttributes): void => {
            socket.broadcast.emit("new-course", course);
        });
    });
}