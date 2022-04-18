import { ScopesOptions } from "sequelize-typescript";
import { ClassroomProtectedFields } from "./classroom.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ClassroomProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));