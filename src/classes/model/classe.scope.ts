import { ScopesOptions } from "sequelize-typescript";
import { ClasseProtectedFields } from "./classe.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ClasseProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));