import { ScopesOptions } from "sequelize-typescript";
import { ClassroomHasCourseProtectedFields } from "./classroomhascourse.interface";
import Course from './../../courses/model/course.model';
import Classroom from './../../classrooms/model/classroom.model';
import Planning from './../../plannings/model/planning.model';
import Feedback from './../../feedbacks/model/feedback.model';
import Grade from './../../grades/model/grade.model';
import Teacher from "./../../teachers/model/teacher.model";
import User from "../../users/model/user.model";
import { UserPublicFields } from "../../users/model/user.interface";

export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ClassroomHasCourseProtectedFields
        },
        include: [
            {
                model: Course.unscoped(),
                required: true,
            },
            {
                model: Classroom.unscoped(),
                required: true,
            }
        ]
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        },
        include: [
            {
                model: Course.unscoped(),
                required: true,
            },
            {
                model: Classroom.unscoped(),
                required: true,
            },
            {
                model: Planning.unscoped(),
                required: false,
            },
            {
                model: Teacher.unscoped(),
                required: false,
            },
            {
                model: Feedback.unscoped(),
                required: false,
            },
            {
                model: Grade.unscoped(),
                required: false,
            }
        ]
    }) as ScopesOptions,
}));