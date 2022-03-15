import { ISocket, IServer } from "../../types/socket";
import { UserAttributes } from "./model/user.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-user", (user: UserAttributes): void => {
            socket.broadcast.emit("new-user", user);
        });
    });
}