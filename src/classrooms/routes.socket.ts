import { ISocket } from "../../types/socket";
import { ClassroomAttributes } from "./model/classroom.interface";
export default (socket: ISocket): void => {
    socket.on("new-classroom", (classroom: ClassroomAttributes): void => {
        socket.broadcast.emit("new-classroom", classroom);
    });
}