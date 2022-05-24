import { ScopesOptions } from "sequelize-typescript";
import { TeacherProtectedFields } from "./teacher.interface";
import User from './../../users/model/user.model';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';
import Grade from './../../grades/model/grade.model';
import Feedback from './../../feedbacks/model/feedback.model';
import { UserPublicFields } from "../../users/model/user.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: TeacherProtectedFields
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            }
        ]
    }) as ScopesOptions,
    withClassroom: ({
        attributes: { 
            exclude: []
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            },
            {
                model: ClassroomHasCourse,
                required: true
            }
        ]
    }) as ScopesOptions,
    withFeedbacks: ({
        include: [
            {
                model: Feedback.unscoped(),
                required: true
            }
        ]
    }) as ScopesOptions,
    withGrades: ({
        include: [
            {
                model: Grade.unscoped(),
                required: true
            }
        ]
    }) as ScopesOptions,
}));