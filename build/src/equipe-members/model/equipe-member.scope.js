"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equipe_member_interface_1 = require("./equipe-member.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: equipe_member_interface_1.EquipeMemberProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
