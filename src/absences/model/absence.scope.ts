import { UserPublicFields } from './../../users/model/user.interface';
import { ScopesOptions } from "sequelize-typescript";
import User from "./../../users/model/user.model";
import { AbsenceProtectedFields } from "./absence.interface";
import Planning from './../../plannings/model/planning.model';
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: AbsenceProtectedFields
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            }
        ]
    }) as ScopesOptions,
    withUser: ({
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            }
        ]
    }) as ScopesOptions,
    withPlanning: ({
        include: [
            {
                model: Planning,
                required: false
            }
        ]
    }) as ScopesOptions,
}));