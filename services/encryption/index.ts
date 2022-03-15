import crypto from 'crypto';
import config from '../../config/env.config';
const { 
    encryption 
} = config;
const { 
    ENCRYPTION_KEY, 
    algorithm, 
    IV_LENGTH 
} = encryption; 


/**
* @description Iv encryption service
* @author Ulysse Dupont
*/
export default class EncryptionService {

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
    static cipher(text: string): string {
        try {
            let iv = crypto.randomBytes(IV_LENGTH);
            let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
            let encrypted = cipher.update(text);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return iv.toString('hex') + ':' + encrypted.toString('hex');
        } catch (err: any) {
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
    static decipher(text: string): string {
        try {
            if(text) {
                let textParts = text.split(':');
                let buffer = textParts.shift() as string;
                let iv = Buffer.from(buffer, 'hex');
                let encryptedText = Buffer.from(textParts.join(':'), 'hex');
                let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
                let decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher.final()]);
                return decrypted.toString();
            }
            return text;
        } catch (err: any) {
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
    static compareSync(dec: string, cip: string): boolean {
        return (dec === EncryptionService.decipher(cip));
    }
}