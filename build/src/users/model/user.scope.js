"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_interface_1 = require("./user.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: user_interface_1.UserProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    },
    onlyID: {
        attributes: [
            'id'
        ]
    }
}));
