import Contract from '../../contracts/model/contract.model';
import { ScopesOptions } from "sequelize-typescript";
import { UserProtectedFields } from "./user.interface";
import Campus from './../../campus/model/campus.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';
import Teacher from '../../teachers/model/teacher.model';
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: []
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
    }) as ScopesOptions,
    withContracts: ({
        include: [
            {
                model: Contract.unscoped(),
                required: false,
            },
        ]
    }) as ScopesOptions,
    withTeachers: ({
        include: [
            {
                model: Teacher.unscoped(),
                required: false,
            },
        ]
    }) as ScopesOptions
}));