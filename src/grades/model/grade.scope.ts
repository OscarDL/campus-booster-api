import { ScopesOptions } from "sequelize-typescript";
import Teacher from "../../teachers/model/teacher.model";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { UserPublicFields } from "../../users/model/user.interface";
import User from "../../users/model/user.model";
import { GradeProtectedFields } from "./grade.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: GradeProtectedFields
        }
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
    withTeacher: ({
        include: [
            {
                model: Teacher.unscoped(),
                required: true,
                include: [
                    {
                        model: User.unscoped(),
                        required: true,
                        attributes: UserPublicFields
                    }
                ]
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