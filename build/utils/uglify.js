"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uglify_js_1 = __importDefault(require("uglify-js"));
const fs_1 = __importDefault(require("fs"));
const SRC_DIR = 'build';
const options = {};
const createMinFiles = (directory) => {
    fs_1.default.readdirSync(directory).forEach(function (file) {
        if (fs_1.default.lstatSync(directory + '/' + file).isDirectory()) {
            if (!fs_1.default.existsSync(directory + '/' + file)) {
                fs_1.default.mkdirSync(directory + '/' + file);
            }
            createMinFiles(directory + '/' + file);
        }
        else {
            if (file.split('.').pop() === 'js') {
                const FILE = {};
                FILE[file] = fs_1.default.readFileSync(directory + '/' + file, 'utf8');
                fs_1.default.writeFileSync(directory + '/' + file, uglify_js_1.default.minify(FILE, options).code, 'utf8');
            }
            else {
                fs_1.default.writeFileSync(directory + '/' + file, fs_1.default.readFileSync(directory + '/' + file, 'utf8'), 'utf8');
            }
        }
    });
};
createMinFiles(SRC_DIR);
