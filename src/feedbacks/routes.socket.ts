import { ISocket } from "../../types/socket";
import { FeedbackAttributes } from "./model/feedback.interface";
export default (socket: ISocket): void => {
    socket.on("new-feedback", (feedback: FeedbackAttributes): void => {
        socket.broadcast.emit("new-feedback", feedback);
    });
}