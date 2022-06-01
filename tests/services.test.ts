"use strict"
import "@dulysse1/better-node";
import chai, { expect } from 'chai';
import EncryptionService from '../services/encryption';
import Moderator from '../services/moderator';
import fs from 'fs';
import path from 'path';
import "../config";
import s3 from '../services/aws/s3';
import AzureService from '../services/azure';
import chaiAsPromise from 'chai-as-promised';
chai.use(chaiAsPromise);

describe('Services:', () => {
    describe('Encryption with crypto:', () => {   
        const message = 'Hello world!';
        it('AES Encryption is working', () => {
            expect(
                EncryptionService.cipher(message).split(':')
            ).to.have.length(2); 
        });
        it('Encryption/Decryption', () => {
            expect(
                EncryptionService.decipher(
                    EncryptionService.cipher(message)
                )
            ).to.be.equal(message);
        });
    });
    describe('Moderator service:', () => { 
        const message = 'Petit con!'; 
        const moderator = new Moderator('french');
        it('Detect insult:', async() => {
            await moderator.ready();
            expect(moderator.detect(message)).to.be.not.equal([]);       
        });
        it('Censor insult:', async() => {
            await moderator.ready();
            expect(moderator.censor(message)).to.be.not.equal(message);
        });
    });
    describe('AWS service:', () => { 
        const KEY = 'tests/interstellar.jpg';
        const DATA = fs.readFileSync(path.resolve(process.cwd(), KEY)); 
        it('Upload file:', async() => {
            expect(await s3.upload(KEY, DATA)).to.have.any.keys('ETag');     
        });
        it('Download file:', async() => {
            expect(await s3.download(KEY)).to.have.any.keys('ETag');
        });
        it('Remove file:', async() => {
            expect(await s3.remove(KEY)).to.be.an('object');
        });
    });
    describe('Azure AD service:', () => {
        const Azure = new AzureService();
        let groupId: string, userId: string;
        it("Get User list:", async() => {
            await Azure.OAuth();
            const users = await Azure.getUsers();
            userId = users?.value?.first()?.id;
            expect(users).to.have.any.keys("value");
        });
        it("Get User by email:", async() => {
            expect(await Azure.getUser(userId)).to.have.any.keys("id");
        });
        it("Get User avatar by email:", async() => {
            const avatar = await Azure.getUserAvatar(userId);
            if(avatar) {
                expect(avatar).to.be.a("string");
            } else {
                expect(avatar).to.be.null;
            }
        });
        it("Get Group list:", async() => {
            const groups = await Azure.getGroups();
            groupId = groups?.value?.first()?.id;
            expect(groups).to.have.any.keys("value");
        });
        it("Get Group members from a group:", async() => {
            expect(await Azure.getGroupMembers(groupId)).to.have.any.keys("value");
        });
    });
});