import { ISocket } from "../../types/socket";
import { AbsenceAttributes } from "./model/absence.interface";
export default (socket: ISocket): void => {
    socket.on("new-absence", (absence: AbsenceAttributes): void => {
        socket.broadcast.emit("new-absence", absence);
    });
}