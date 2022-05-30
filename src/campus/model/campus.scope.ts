import { ScopesOptions } from "sequelize-typescript";
import { CampusProtectedFields } from "./campus.interface";
import User from './../../users/model/user.model';
import Classroom from './../../classrooms/model/classroom.model';
import { UserPublicFields } from "../../users/model/user.interface";
import config from '../../../config/env.config';
const { permissionLevel: roles } = config;
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: CampusProtectedFields
        }
    }) as ScopesOptions,
    withUsers: ({
        include: [
            {
                model: User.unscoped(),
                required: false,
                attributes: UserPublicFields,
            }
        ]
    }) as ScopesOptions,
    withCampusManager: ({
        include: [
            {
                model: User.unscoped(),
                required: false,
                attributes: UserPublicFields,
                where: {
                    role: roles.CampusManager
                }
            }
        ]
    }) as ScopesOptions,
    withClassrooms: ({
        include: [
            {
                model: Classroom.unscoped(),
                required: false
            }
        ]
    }) as ScopesOptions,
}));