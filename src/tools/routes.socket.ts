import { ISocket } from "../../types/socket";
import { ToolAttributes } from "./model/tool.interface";
export default (socket: ISocket): void => {
    socket.on("new-tool", (tool: ToolAttributes): void => {
        socket.broadcast.emit("new-tool", tool);
    });
}