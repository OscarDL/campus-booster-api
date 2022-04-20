import { ScopesOptions } from "sequelize-typescript";
import { UserHasClassroomProtectedFields } from "./user-hasclassroom.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: UserHasClassroomProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));