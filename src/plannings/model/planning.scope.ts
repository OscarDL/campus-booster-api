import { ScopesOptions } from "sequelize-typescript";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { PlanningProtectedFields } from "./planning.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: PlanningProtectedFields
        },
        include: [
            {
                model: ClassroomHasCourse,
                required: true
            }
        ]
    }) as ScopesOptions,
}));