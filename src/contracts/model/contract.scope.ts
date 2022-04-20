import { ScopesOptions } from "sequelize-typescript";
import { ContractProtectedFields } from "./contract.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ContractProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));