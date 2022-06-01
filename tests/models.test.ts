"use strict"
import "colors.ts"; 
import "@dulysse1/better-node";
import chai, { expect } from 'chai';
import "../config";
import chaiAsPromise from 'chai-as-promised';
chai.use(chaiAsPromise);
import * as S from "../config/models.config";

describe('Sequelize:', () => {
    describe('Config:', () => {
        it("Login:", async() => {
            expect(
                await S.sequelize.sync({ logging: false })
            ).to.have.any.keys("options", "config", "models", "dialect");
        });
    }); 
    describe('Models:', () => {
        Object.keys(S.models).forEach(Model => {
            describe(`Model ${Model}:`, () => {   
                it(`Find all ${Model.toString().toLocaleLowerCase()}:`, async() => {     
                    expect(
                        await S.models[Model].findAll()
                    ).to.be.an("array"); 
                });
                it(`Find one ${Model.toString().toLocaleLowerCase()}:`, async() => {     
                    try {
                        expect(
                            await S.models[Model].findOne()
                        ).to.be.null;
                    } catch (e) {
                        expect(
                            await S.models[Model].findOne()
                        ).to.be.an("object");
                    }
                });
                it(`Find by ID ${Model.toString().toLocaleLowerCase()}:`, async() => {
                    try {
                        expect(
                            await S.models[Model].findByPk(1)
                        ).to.be.null;
                    } catch (e) {
                        expect(
                            await S.models[Model].findByPk(1)
                        ).to.be.an("object");
                    }
                });
                it(`Count ${Model.toString().toLocaleLowerCase()}:`, async() => {     
                    expect(
                        await S.models[Model].count()
                    ).to.be.a("number"); 
                });
            });
        });
    });
});