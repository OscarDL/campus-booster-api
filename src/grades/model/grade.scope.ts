import { ScopesOptions } from "sequelize-typescript";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { UserPublicFields } from "../../users/model/user.interface";
import Teacher from "../../teachers/model/teacher.model";
import User from "../../users/model/user.model";
import { GradeProtectedFields } from "./grade.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: GradeProtectedFields
        }
    }) as ScopesOptions,
    withTeacher: ({
        include: [
            {
                model: Teacher,
                required: false
            }
        ]
    }) as ScopesOptions,
    withUser: ({
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            }
        ]
    }) as ScopesOptions,
    withCourse: ({
        include: [
            {
                model: ClassroomHasCourse,
                required: false,
            }
        ]
    }) as ScopesOptions
}));