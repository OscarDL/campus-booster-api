import { ScopesOptions } from "sequelize-typescript";
import { UserProtectedFields } from "./user.interface";
import Campus from './../../campus/model/campus.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: UserProtectedFields
        }
    }) as ScopesOptions,
    all: ({
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
    withCampus: ({
        include: [
            {
                model: Campus.unscoped(),
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
}));