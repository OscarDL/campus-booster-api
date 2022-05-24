import { ScopesOptions } from "sequelize-typescript";
import { UserProtectedFields } from "./user.interface";
import Campus from './../../campus/model/campus.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';
import config from '../../../config/env.config';
const { permissionLevel: { Student } } = config;
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: UserProtectedFields
        },
        include: [
            {
                model: Campus.unscoped(),
                required: false
            }
        ]
    }) as ScopesOptions,
    iamNotAdmin: ({
        attributes: { 
            exclude: UserProtectedFields
        },
        where: {
            role: Student
        },
        include: [
            {
                model: Campus.unscoped(),
                required: false
            }
        ]
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        },
        include: [
            {
                model: Campus.unscoped(),
                required: false
            },
            {
                model: UserHasClassroom,
                required: false
            }
        ]
    }) as ScopesOptions,
    withClassrooms: ({
        include: [
            {
                model: UserHasClassroom,
                required: false
            }
        ]
    }) as ScopesOptions
}));