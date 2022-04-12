import { ScopesOptions } from "sequelize-typescript";
import { CampusProtectedFields } from "./campus.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: CampusProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));