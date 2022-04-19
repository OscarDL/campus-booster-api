import { ISocket } from "../../types/socket";
import { CampusAttributes } from "./model/campus.interface";
export default (socket: ISocket): void => {
    socket.on("new-campus", (campus: CampusAttributes): void => {
        socket.broadcast.emit("new-campus", campus);
    });
}