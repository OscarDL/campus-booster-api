import { ISocket } from "../../types/socket";
import { CourseContentAttributes } from "./model/course-content.interface";
export default (socket: ISocket): void => {
    socket.on("new-coursecontent", (coursecontent: CourseContentAttributes): void => {
        socket.broadcast.emit("new-coursecontent", coursecontent);
    });
}