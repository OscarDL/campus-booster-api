"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const file = fs_1.default.readFileSync(path_1.default.join(__dirname, 'domains.txt')).toString();
fs_1.default.writeFileSync(path_1.default.join(__dirname, 'domains.json'), JSON.stringify(file.split('\n')), {
    encoding: 'utf-8'
});
