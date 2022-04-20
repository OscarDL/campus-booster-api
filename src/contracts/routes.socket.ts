import { ISocket } from "../../types/socket";
import { ContractAttributes } from "./model/contract.interface";
export default (socket: ISocket): void => {
    socket.on("new-contract", (contract: ContractAttributes): void => {
        socket.broadcast.emit("new-contract", contract);
    });
}