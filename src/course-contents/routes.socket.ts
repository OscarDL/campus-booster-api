import { ISocket, IServer } from "../../types/socket";
import { CourseContentAttributes } from "./model/course-content.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-coursecontent", (coursecontent: CourseContentAttributes): void => {
            socket.broadcast.emit("new-coursecontent", coursecontent);
        });
    });
}