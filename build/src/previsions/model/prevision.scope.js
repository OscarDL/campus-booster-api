"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prevision_interface_1 = require("./prevision.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: prevision_interface_1.PrevisionProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
