import { ISocket } from "../../types/socket";
import { AttendanceAttributes } from "./model/attendance.interface";
export default (socket: ISocket): void => {
    socket.on("new-attendance", (attendance: AttendanceAttributes): void => {
        socket.broadcast.emit("new-attendance", attendance);
    });
}