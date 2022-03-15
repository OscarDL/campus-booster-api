"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_user_interface_1 = require("./topic-user.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: topic_user_interface_1.TopicUserProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
