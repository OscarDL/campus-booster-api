"use strict"
import { assert, expect } from 'chai';
import EncryptionService from '../services/encryption';
import Moderator from '../services/moderator';

describe('Services:', () => {
    describe('Encryption with crypto:', () => {   
        const message = 'Hello world!';
        it('AES Encryption is working', () => {
            const encr = EncryptionService.cipher(message);
            expect(encr.split(':')).to.have.length(2); 
        });
        it('Encryption/Decryption', () => {
            const encr = EncryptionService.cipher(message);
            const descr = EncryptionService.decipher(encr);
            expect(descr).to.be.equal(message);
        });
    });
    describe('Moderator service:', () => { 
        const message = 'Petit con!'; 
        const moderator = new Moderator('french');
        it('Detect insult:', () => {
            moderator.ready().then(_ => {
                assert.notEqual(moderator.detect(message), [])
            });
        });
        it('Censor insult:', () => {
            moderator.ready().then(_ => {
                assert.notEqual(moderator.censor(message), message);
            });
        });
    });
});