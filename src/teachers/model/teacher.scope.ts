import { ScopesOptions } from "sequelize-typescript";
import { TeacherProtectedFields } from "./teacher.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: TeacherProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));