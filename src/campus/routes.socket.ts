import { ISocket, IServer } from "../../types/socket";
import { CampusAttributes } from "./model/campus.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-campus", (campus: CampusAttributes): void => {
            socket.broadcast.emit("new-campus", campus);
        });
    });
}