import { ISocket, IServer } from "../../types/socket";
import { ToolAttributes } from "./model/tool.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-tool", (tool: ToolAttributes): void => {
            socket.broadcast.emit("new-tool", tool);
        });
    });
}