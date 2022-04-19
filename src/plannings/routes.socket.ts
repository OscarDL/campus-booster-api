import { ISocket } from "../../types/socket";
import { PlanningAttributes } from "./model/planning.interface";
export default (socket: ISocket): void => {
    socket.on("new-planning", (planning: PlanningAttributes): void => {
        socket.broadcast.emit("new-planning", planning);
    });
}