import { ScopesOptions } from "sequelize-typescript";
import Teacher from "../../teachers/model/teacher.model";
import { UserPublicFields } from "../../users/model/user.interface";
import User from "../../users/model/user.model";
import { ContractProtectedFields } from "./contract.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ContractProtectedFields
        }
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
    withTeacher: ({
        include: [
            {
                model: Teacher,
                required: true
            }
        ]
    }) as ScopesOptions,
}));