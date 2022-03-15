"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const topic_interface_1 = require("./topic.interface");
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: topic_interface_1.TopicProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    }
}));
