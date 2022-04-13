import { ScopesOptions } from "sequelize-typescript";
import { FeedbackProtectedFields } from "./feedback.interface";
export default (() => ({
    defaultScope: ({
        attributes: { 
            exclude: FeedbackProtectedFields
        }
    }) as ScopesOptions,
    all: ({
        attributes: { 
            exclude: []
        }
    }) as ScopesOptions,
}));