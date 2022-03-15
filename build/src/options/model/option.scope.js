"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const option_interface_1 = require("./option.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: option_interface_1.OptionProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
