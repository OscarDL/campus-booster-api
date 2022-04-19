import { ScopesOptions } from "sequelize-typescript";
import { ClassroomHasCourseProtectedFields } from "./classroomhascourse.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ClassroomHasCourseProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));