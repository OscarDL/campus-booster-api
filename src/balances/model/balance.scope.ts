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
                model: User,
                required: true,
                attributes: [ "id", "first_name", "last_name", "email" ]
            }
        ]
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));