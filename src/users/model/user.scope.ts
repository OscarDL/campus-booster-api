import { ScopesOptions } from "sequelize-typescript";
import { UserProtectedFields } from "./user.interface";
import Campus from './../../campus/model/campus.model';
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
}));