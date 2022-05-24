import { ScopesOptions } from "sequelize-typescript";
import { CourseContentProtectedFields } from "./course-content.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: CourseContentProtectedFields
        },
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));