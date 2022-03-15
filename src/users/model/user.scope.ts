import { ScopesOptions } from "sequelize-typescript";
import { UserProtectedFields } from "./user.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: UserProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));