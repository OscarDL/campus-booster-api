import { ScopesOptions } from "sequelize-typescript";
import UserHasClassroom from "../../user_has_classrooms/model/user-hasclassroom.model";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { ClassroomProtectedFields } from "./classroom.interface";
import Planning from "../../plannings/model/planning.model";
import Course from "../../courses/model/course.model";
import Campus from "../../campus/model/campus.model";
import Classroom from "./classroom.model";
import { UserPublicFields } from "./../../users/model/user.interface";
import User from "./../../users/model/user.model";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ClassroomProtectedFields
        },
        include: [
            {
                model: ClassroomHasCourse.unscoped(),
                required: false,
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
                model: UserHasClassroom.unscoped(),
                required: false,
                include: [
                    {
                        model: User.unscoped(),
                        required: true,
                        attributes: UserPublicFields
                    },
                    {
                        model: Classroom.unscoped(),
                        required: true
                    },
                ]
            },
            {
                model: Campus.unscoped(),
                required: false,
            }
        ]
    }) as ScopesOptions
}));