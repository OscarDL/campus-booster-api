import { ScopesOptions } from "sequelize-typescript";
import { ToolProtectedFields } from "./tool.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: ToolProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));