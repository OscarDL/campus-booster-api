"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observation_interface_1 = require("./observation.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: observation_interface_1.ObservationProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
