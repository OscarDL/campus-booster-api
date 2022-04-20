import { ISocket } from "../../types/socket";
import { BalanceAttributes } from "./model/balance.interface";
export default (socket: ISocket): void => {
    socket.on("new-balance", (balance: BalanceAttributes): void => {
        socket.broadcast.emit("new-balance", balance);
    });
}