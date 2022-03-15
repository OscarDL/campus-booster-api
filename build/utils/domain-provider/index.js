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
const domains_json_1 = __importDefault(require("./domains.json"));
const request_1 = __importDefault(require("request"));
var Domain;
(function (Domain) {
    /**
    * Check if an email domain is correct.
    *
    * @param email - your full email address
    *
    * @returns true = domain is valid
    */
    function check(email) {
        return email.split('@').length === 2 ?
            !domains_json_1.default.includes(email.split('@').pop()) : false;
    }
    Domain.check = check;
    //TODO: 
    function checkOnline(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield domainAvailability(email));
            return true;
        });
    }
    function domainAvailability(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const API_KEY = 'at_BsxgOsp0CSG0tyQKJxbmBAeu9mmCI';
                const domain = email.split('@').pop();
                request_1.default.get(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${API_KEY}&domainName=${domain}&credits=DA&mode=DNS_AND_WHOIS`, {
                    json: true
                }, (err, res, body) => err ? reject(err) : resolve(body));
            });
        });
    }
})(Domain || (Domain = {}));
exports.default = Domain;
