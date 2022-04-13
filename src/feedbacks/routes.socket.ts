import { ISocket, IServer } from "../../types/socket";
import { FeedbackAttributes } from "./model/feedback.interface";
export default (io: IServer): void => {
    io.on("connect", (socket: ISocket): void => {
        socket.on("new-feedback", (feedback: FeedbackAttributes): void => {
            socket.broadcast.emit("new-feedback", feedback);
        });
    });
}