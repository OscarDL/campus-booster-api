import { ScopesOptions } from "sequelize-typescript";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { UserPublicFields } from "../../users/model/user.interface";
import User from "../../users/model/user.model";
import { ProjectProtectedFields } from "./project.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ProjectProtectedFields
        }
    }) as ScopesOptions,
    withClassroomHasCourse: ({
        include: [
            {
                model: ClassroomHasCourse,
                required: true
            }
        ]
    }) as ScopesOptions,
}));