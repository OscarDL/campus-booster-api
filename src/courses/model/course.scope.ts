import { ScopeOptions, ScopesOptions } from "sequelize-typescript";
import Planning from "../../plannings/model/planning.model";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
import { CourseProtectedFields } from "./course.interface";
import Classroom from "../../classrooms/model/classroom.model";
import UserHasClassroom from "../../user_has_classrooms/model/user-hasclassroom.model";
import CourseContent from "../../course-contents/model/course-content.model";
import Teacher from "../../teachers/model/teacher.model";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: CourseProtectedFields
        }
    }) as ScopesOptions,
    withClassroomHasCourse: ({
        include: [
            {
                model: ClassroomHasCourse.unscoped(),
                required: false,
                include: [
                    {
                        model: Planning.unscoped(),
                        required: false
                    },
                    {
                        model: Teacher.unscoped(),
                        required: false
                    }
                ]
            }
        ]
    }) as ScopesOptions,
    withUser: ({
        include: [
            {
                model: ClassroomHasCourse.unscoped(),
                required: true,
                include: [
                    {
                        model: Classroom.unscoped(),
                        required: true,
                        include: [
                            {
                                model: UserHasClassroom.unscoped(),
                                required: true
                            }
                        ]
                    }
                ]
            }
        ],
    }) as ScopesOptions,
    withContent: ({
        include: [
            {
                model: CourseContent.unscoped(),
                required: false
            }
        ]
    }) as ScopesOptions,
}));