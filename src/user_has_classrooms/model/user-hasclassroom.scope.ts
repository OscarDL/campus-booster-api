import { ScopesOptions } from "sequelize-typescript";
import { UserHasClassroomProtectedFields } from "./user-hasclassroom.interface";
import User from './../../users/model/user.model';
import Classroom from './../../classrooms/model/classroom.model';
import { UserPublicFields } from "../../users/model/user.interface";
import ClassroomHasCourse from "../../classroom_has_courses/model/classroomhascourse.model";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: UserHasClassroomProtectedFields
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            },
            {
                model: Classroom.unscoped(),
                required: true,
                include: [
                    {
                        model: ClassroomHasCourse.unscoped(),
                        required: false,
                    }
                ]
            },
        ]
    }) as ScopesOptions,
    all: ({
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
                model: Classroom.unscoped(),
                required: true,
                include: [
                    {
                        model: ClassroomHasCourse.unscoped(),
                        required: false,
                    }
                ]
            },
        ]
    }) as ScopesOptions,
}));