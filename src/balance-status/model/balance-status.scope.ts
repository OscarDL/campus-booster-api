import { ScopesOptions } from "sequelize-typescript";
import { BalanceStatusProtectedFields } from "./balance-status.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: BalanceStatusProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));