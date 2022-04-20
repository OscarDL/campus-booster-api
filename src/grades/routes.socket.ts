import { ISocket } from "../../types/socket";
import { GradeAttributes } from "./model/grade.interface";
export default (socket: ISocket): void => {
    socket.on("new-grade", (grade: GradeAttributes): void => {
        socket.broadcast.emit("new-grade", grade);
    });
}