"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
/**
*  Typescript JSON reader/decoder
*  @author Ulysse Dupont
*/
class JsonReader {
    constructor(path) {
        this._path = path;
    }
    readerAsync() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this._path.toString(), (err, data) => {
                return (err) ? reject(err) : resolve(JSON.parse(data.toString()));
            });
        });
    }
    readerSync() {
        return JSON.parse(fs_1.default.readFileSync(this._path.toString()).toString());
    }
    /**
     * Read your file content synchronously
     */
    decodeSync() {
        return this.readerSync();
    }
    /**
     * Read your file content asynchronously
     */
    decodeAsync() {
        return this.readerAsync();
    }
}
exports.default = JsonReader;
