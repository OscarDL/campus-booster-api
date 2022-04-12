import { ScopesOptions } from "sequelize-typescript";
import { CourseProtectedFields } from "./course.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: CourseProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));