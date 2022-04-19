import { ScopesOptions } from "sequelize-typescript";
import { PlanningProtectedFields } from "./planning.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: PlanningProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));