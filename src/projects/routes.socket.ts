import { ISocket } from "../../types/socket";
import { ProjectAttributes } from "./model/project.interface";
export default (socket: ISocket): void => {
    socket.on("new-project", (project: ProjectAttributes): void => {
        socket.broadcast.emit("new-project", project);
    });
}