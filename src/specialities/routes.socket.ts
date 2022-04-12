import { ISocket, IServer } from "../../types/socket";
import { SpecialityAttributes } from "./model/speciality.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-speciality", (speciality: SpecialityAttributes): void => {
            socket.broadcast.emit("new-speciality", speciality);
        });
    });
}