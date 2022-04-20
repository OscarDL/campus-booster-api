import { ISocket } from "../../types/socket";
import { UserAttributes } from "./model/user.interface";
export default (socket: ISocket): void => {
    socket.on("new-user", (user: UserAttributes): void => {
        socket.broadcast.emit("new-user", user);
    });
}