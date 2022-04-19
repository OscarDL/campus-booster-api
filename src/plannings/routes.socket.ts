import { ISocket, IServer } from "../../types/socket";
import { PlanningAttributes } from "./model/planning.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-planning", (planning: PlanningAttributes): void => {
            socket.broadcast.emit("new-planning", planning);
        });
    });
}