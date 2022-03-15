"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const env_config_1 = __importDefault(require("../../config/env.config"));
const { encryption } = env_config_1.default;
const { ENCRYPTION_KEY, algorithm, IV_LENGTH } = encryption;
/**
* @description Iv encryption service
* @author Ulysse Dupont
*/
class EncryptionService {
    /**
    * Encrypt your message with an initialization vector (iv)
    *
    * @param text - the text you want to encrypt
    * @type string
    *
    * @example
    * ```js
    *    cipher('Hello world!');
    *    -> 'b10fa717252683e43fd44fdecb3f3a8c:1dff1165ce8da183fda26bcf29391ffe'
    * ```
    * @return — The text encrypted
    *
    */
    static cipher(text) {
        try {
            let iv = crypto_1.default.randomBytes(IV_LENGTH);
            let cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        }
        catch (err) {
            return text;
        }
    }
    /**
    * Decrypt your message with an initialization vector (iv)
    *
    * @param text - the encrypted text you want to decrypt
    * @type string
    *
    * @example
    * ```js
    *    decipher('b10fa717252683e43fd44fdecb3f3a8c:1dff1165ce8da183fda26bcf29391ffe');
    *    -> 'Hello world!'
    * ```
    * @return — The text decrypted
    *
    */
    static decipher(text) {
        try {
            if (text) {
                let textParts = text.split(':');
                let buffer = textParts.shift();
                let iv = Buffer.from(buffer, 'hex');
                let encryptedText = Buffer.from(textParts.join(':'), 'hex');
                let decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
                let decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher.final()]);
                return decrypted.toString();
            }
            return text;
        }
        catch (err) {
            return text;
        }
    }
    /**
    * Compare a cipher text with an expected text
    *
    * @param dec - the expected text
    * @type string
    *
    * @param cip - the encrypted text
    * @type string
    *
    * @example
    * ```js
    *    compareSync('Hello world!', 'b10fa717252683e43fd44fdecb3f3a8c:1dff1165ce8da183fda26bcf29391ffe');
    *    -> true
    *    compareSync('Hello world?', 'b10fa717252683e43fd44fdecb3f3a8c:1dff1165ce8da183fda26bcf29391ffe');
    *    -> false
    * ```
    * @return — A boolean
    *
    */
    static compareSync(dec, cip) {
        return (dec === EncryptionService.decipher(cip));
    }
}
exports.default = EncryptionService;
