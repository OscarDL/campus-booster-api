"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_interface_1 = require("./client.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: client_interface_1.ClientProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
