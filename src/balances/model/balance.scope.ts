import { ScopesOptions } from "sequelize-typescript";
import { UserPublicFields } from "../../users/model/user.interface";
import User from "../../users/model/user.model";
import { BalanceProtectedFields } from "./balance.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: BalanceProtectedFields
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            }
        ]
    }) as ScopesOptions
}));