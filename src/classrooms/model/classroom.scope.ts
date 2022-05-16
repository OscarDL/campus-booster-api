import { ScopesOptions } from "sequelize-typescript";
import UserHasClassroom from "../../user_has_classrooms/model/user-hasclassroom.model";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { ClassroomProtectedFields } from "./classroom.interface";
import Planning from "../../plannings/model/planning.model";
import Course from "../../courses/model/course.model";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ClassroomProtectedFields
        },
        include: [
            {
                model: ClassroomHasCourse.unscoped(),
                required: true,
                include: [
                    {
                        model: Planning.unscoped(),
                        required: false,
                    },
                    {
                        model: Course.unscoped(),
                        required: false,
                    }
                ]
            },
            {
                model: UserHasClassroom,
                required: true,
            }
        ]
    }) as ScopesOptions
}));