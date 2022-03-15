"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const temps_interface_1 = require("./temps.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: temps_interface_1.TempsProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
