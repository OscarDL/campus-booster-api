import { ScopesOptions } from "sequelize-typescript";
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
                attributes: [ "id", "firstName", "lastName", "email" ]
            }
        ]
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));