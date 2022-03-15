"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validFileName = ['routes.config.ts', 'routes.config.js'];
const requireFiles = function (directory, app) {
    fs_1.default.readdirSync(directory).forEach(fileName => {
        // Recurse if directory
        if (fs_1.default.lstatSync(`${directory}/${fileName}`).isDirectory()) {
            requireFiles(`${directory}/${fileName}`, app);
        }
        else {
            // Skip this file
            if (validFileName.includes(fileName) && directory === __dirname)
                return;
            // Skip this file
            if (!validFileName.includes(fileName))
                return;
            require(`${directory}/${fileName}`).default(app);
        }
    });
};
function default_1(app) {
    return requireFiles(path_1.default.normalize(`${__dirname}/../src`), app);
}
exports.default = default_1;
