import { Sequelize } from 'sequelize-typescript';
import fs from 'fs';
import path from 'path';
import { development, production } from './config.json';
import { Op } from 'sequelize';

import Config from './env.config';
const config = (Config.env === 'development') ? development : production;
const validFileName = [ '.model.ts', '.model.js' ];

const requireFiles = (directory: string, store: string[]): string[] => {   
    const files = fs.readdirSync(directory);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (fs.lstatSync(directory + '/' + file).isDirectory()) {
            requireFiles(directory + '/' + file, store);
        } else {
            if (validFileName.includes(file.slice(-9))) {
                store.push(directory + '/' + file);
            }
        }
    }
    return store;
}

const sequelize =  new Sequelize({
    username: config.username,
    password: config.password,
    host: config.host,
    database: config.database,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    port: config.port,
    models: requireFiles(path.normalize(`${__dirname}/../src`), new Array()) 
});

export function login(): Promise<Sequelize> {
    return new Promise((resolve, reject) => {
        sequelize.sync({ 
            alter: true,
            force: false,
            logging: false
        }).then(() => {
            console.log(
                `\n⮕  Database environment: ${Config.env.toLocaleUpperCase()} ${Config.env === 'production' ? '🔥' : '🛠️'}`.rgb(198, 98, 255)
            );
            console.log('\n✅ Database is synchronized'.green);
            return resolve(sequelize);
        }).catch((err) => {
            console.log(err);
            console.log(`\n❌ Unable to synchronize the Database => Error: ${JSON.stringify(err)}`.red.bold);
            process.kill(process.pid);
            return reject(err);
        });
    });
}

const models = sequelize.models;

export { sequelize, Sequelize, Op, models };
export default { login };