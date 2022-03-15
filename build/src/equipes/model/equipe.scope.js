"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equipe_interface_1 = require("./equipe.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: equipe_interface_1.EquipeProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
