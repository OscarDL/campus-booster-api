"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contrat_interface_1 = require("./contrat.interface");
const client_model_1 = __importDefault(require("./../../clients/model/client.model"));
exports.default = (() => ({
    defaultScope: {
        attributes: {
            exclude: contrat_interface_1.ContratProtectedFields
        }
    },
    all: {
        attributes: {
            exclude: []
        }
    },
    withClient: {
        include: [
            {
                model: client_model_1.default,
                required: false
            }
        ]
    }
}));
