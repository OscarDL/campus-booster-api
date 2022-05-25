import { ScopesOptions } from "sequelize-typescript";
import Teacher from "./../../teachers/model/teacher.model";
import { UserPublicFields } from "../../users/model/user.interface";
import User from "../../users/model/user.model";
import { ContractProtectedFields } from "./contract.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ContractProtectedFields
        },
        include: [
            {
                model: User.unscoped(),
                required: true,
                attributes: UserPublicFields
            },
            {
                model: Teacher.unscoped(),
                required: true,
                include: [{
                    model: User.unscoped(),
                    required: true,
                    attributes: UserPublicFields
                }]
            }
        ]
    }) as ScopesOptions,
}));