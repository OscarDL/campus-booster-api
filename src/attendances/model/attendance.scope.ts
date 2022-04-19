import { ScopesOptions } from "sequelize-typescript";
import { AttendanceProtectedFields } from "./attendance.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: AttendanceProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));