"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validFileName = ['.socket.ts', '.socket.js'];
const importFiles = function (directory, io) {
    fs_1.default.readdirSync(directory).forEach(function (file) {
        // Recurse if directory
        if (fs_1.default.lstatSync(directory + '/' + file).isDirectory()) {
            importFiles(directory + '/' + file, io);
        }
        else {
            // Skip this file
            if (!validFileName.includes(file.slice(-10)))
                return;
            require(`${directory}/${file}`).default(io);
        }
    });
};
function default_1(io) {
    return importFiles(path_1.default.join(`${__dirname}/../src`), io);
}
exports.default = default_1;
