import { ISocket, IServer } from "../../types/socket";
import { AttendanceAttributes } from "./model/attendance.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-attendance", (attendance: AttendanceAttributes): void => {
            socket.broadcast.emit("new-attendance", attendance);
        });
    });
}