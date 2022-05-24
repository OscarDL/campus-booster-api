import { ScopesOptions } from "sequelize-typescript";
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
                as: 'User',
                required: true,
                attributes: UserPublicFields
            },
            {
                model: User.unscoped(),
                as: 'Supervisor',
                required: true,
                attributes: UserPublicFields
            }
        ]
    }) as ScopesOptions,
}));