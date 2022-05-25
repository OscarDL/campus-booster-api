import { ScopesOptions } from "sequelize-typescript";
import Course from "../../courses/model/course.model";
import { CourseContentProtectedFields } from "./course-content.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: CourseContentProtectedFields
        },
        include: [
            {
                model: Course.unscoped(),
                required: true
            }
        ]
    }) as ScopesOptions
}));