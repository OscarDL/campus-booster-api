import { ScopesOptions } from "sequelize-typescript";
import { SpecialityProtectedFields } from "./speciality.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: SpecialityProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));