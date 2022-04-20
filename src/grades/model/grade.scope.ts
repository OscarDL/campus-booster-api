import { ScopesOptions } from "sequelize-typescript";
import { GradeProtectedFields } from "./grade.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: GradeProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));