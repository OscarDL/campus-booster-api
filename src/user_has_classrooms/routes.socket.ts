import { ISocket } from "../../types/socket";
import { UserHasClassroomAttributes } from "./model/user-hasclassroom.interface";
export default (socket: ISocket): void => {
    socket.on("new-userhasclassroom", (userhasclassroom: UserHasClassroomAttributes): void => {
        socket.broadcast.emit("new-userhasclassroom", userhasclassroom);
    });
}