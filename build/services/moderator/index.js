"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csvtojson_1 = __importDefault(require("csvtojson"));
const path_1 = __importDefault(require("path"));
const Langs = {
    french: 'french.csv',
    english: 'english.csv',
    italian: 'italian.csv',
    spanish: 'spanish.csv'
};
function getPkgJsonDir() {
    return __awaiter(this, void 0, void 0, function* () {
        const { dirname } = require('path');
        const { constants, promises: { access } } = require('fs');
        for (let path of module.paths) {
            try {
                let prospectivePkgJsonDir = dirname(path);
                yield access(path, constants.F_OK);
                return prospectivePkgJsonDir;
            }
            catch (e) { }
        }
    });
}
/**
* Moderator for banned words into a sentence
* @author Ulysse Dupont
*/
class Moderator {
    /**
     *
     * @param langs choose your language(s)
     */
    constructor(...langs) {
        this._words = [];
        this._langs = [...new Set(langs)];
    }
    getWordsFromLang(lang) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            (0, csvtojson_1.default)({
                delimiter: ',',
                ignoreEmpty: true,
                noheader: true,
                downstreamFormat: 'array'
            }).fromFile(path_1.default.join(yield getPkgJsonDir(), '/services/moderator/lang/', Langs[lang])).then(resolve);
        }));
    }
    replaceStringAt(text, index, replacement) {
        return text.substr(0, index) + replacement + text.substr(index + replacement.length);
    }
    /**
     * LOAD RESOURCES FOR BANNED WORDS
     */
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._words.length) {
                for (let i = 0; i < this._langs.length; i++) {
                    const lang = this._langs[i];
                    this._words.push(...(yield this.getWordsFromLang(lang)).map(csv => csv.field1));
                }
            }
            return this;
        });
    }
    detectWord(text, w) {
        return (text.toLocaleLowerCase().includes(w.toLocaleLowerCase()) &&
            (text[text.toLocaleLowerCase().indexOf(w.toLocaleLowerCase()) + w.length] === ' ' ||
                text.toLocaleLowerCase().indexOf(w.toLocaleLowerCase()) + w.length === text.length) && (text[text.toLocaleLowerCase().indexOf(w.toLocaleLowerCase()) - 1] === ' ' ||
            text.toLocaleLowerCase().indexOf(w.toLocaleLowerCase()) === 0));
    }
    /**
     *
     * @param text Your text where you want to detect insult
     */
    detect(text) {
        return this._words.filter(w => {
            return (this.detectWord(text, w));
        });
    }
    /**
     *
     * @param text The text where you want to censor insult
     */
    censor(text) {
        const words = this.detect(text);
        let filteredText = text.slice();
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            while (this.detectWord(filteredText, word)) {
                filteredText = this.replaceStringAt(filteredText, filteredText.toLocaleLowerCase().indexOf(word.toLocaleLowerCase()) + 1, '*'.repeat(word.length - 1));
            }
        }
        return filteredText;
    }
}
exports.default = Moderator;
