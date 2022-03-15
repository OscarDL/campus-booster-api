import { expect } from 'chai';

import EncryptionService from '../services/encryption';
import Moderator from '../services/moderator';
import FileReader from '../services/fileReader';

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
        let moderator = new Moderator('french');
        it('Detect insult:', async() => {
            moderator = await moderator.ready();
            expect(moderator.detect(message)).to.have.lengthOf.above(0);
        });
        it('Censor insult:', async() => {
            moderator = await moderator.ready();
            expect(moderator.censor(message)).to.not.be.equal(message);
        });
    });

    describe('FileReader service:', () => { 
        const fs = new FileReader('/Users/ulyssedupont/Desktop/ulysse/PERSO/PROMISE/api/server.cors.json');
        it('Read JSON file Sync:', () => {
            expect(fs.decodeSync()).to.not.be.null;
        });
        it('Read JSON file Async:', async() => {
            expect(await fs.decodeAsync()).to.not.be.null;
        });
    });
});