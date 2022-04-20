import { ScopesOptions } from "sequelize-typescript";
import { BalanceProtectedFields } from "./balance.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: BalanceProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));