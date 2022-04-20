import { ISocket } from "../../types/socket";
import { SpecialityAttributes } from "./model/speciality.interface";
export default (socket: ISocket): void => {
    socket.on("new-speciality", (speciality: SpecialityAttributes): void => {
        socket.broadcast.emit("new-speciality", speciality);
    });
}