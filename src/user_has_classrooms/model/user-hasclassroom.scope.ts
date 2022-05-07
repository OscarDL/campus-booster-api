import { ScopesOptions } from "sequelize-typescript";
import { UserHasClassroomProtectedFields } from "./user-hasclassroom.interface";
import User from './../../users/model/user.model';
import Classroom from './../../classrooms/model/classroom.model';
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: UserHasClassroomProtectedFields
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
            },
            {
                model: Classroom.unscoped(),
                required: true,
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
            },
            {
                model: Classroom.unscoped(),
                required: true,
            },
        ]
    }) as ScopesOptions,
}));