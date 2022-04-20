import { ISocket } from "../../types/socket";
import { BalanceStatusAttributes } from "./model/balance-status.interface";
export default (socket: ISocket): void => {
    socket.on("new-balancestatus", (balancestatus: BalanceStatusAttributes): void => {
        socket.broadcast.emit("new-balancestatus", balancestatus);
    });
}