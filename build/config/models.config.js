"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = exports.Op = exports.Sequelize = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_typescript_1.Sequelize; } });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_json_1 = require("./config.json");
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Op", { enumerable: true, get: function () { return sequelize_1.Op; } });
const env_config_1 = __importDefault(require("./env.config"));
const config = (env_config_1.default.env === 'development') ? config_json_1.development : config_json_1.production;
const validFileName = ['.model.ts', '.model.js'];
const requireFiles = (directory, store) => {
    const files = fs_1.default.readdirSync(directory);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (fs_1.default.lstatSync(directory + '/' + file).isDirectory()) {
            requireFiles(directory + '/' + file, store);
        }
        else {
            if (validFileName.includes(file.slice(-9))) {
                store.push(directory + '/' + file);
            }
        }
    }
    return store;
};
const sequelize = new sequelize_typescript_1.Sequelize({
    username: config.username,
    password: config.password,
    host: config.host,
    database: config.database,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    port: config.port,
    models: requireFiles(path_1.default.normalize(`${__dirname}/../src`), new Array())
});
exports.sequelize = sequelize;
// INITIALISATION SEQUELIZE
sequelize.sync({
    force: false,
    alter: true,
    logging: false
}).then(() => {
    console.log(`\n⮕  Database environment: ${env_config_1.default.env.toLocaleUpperCase()} ${env_config_1.default.env === 'production' ? '🔥' : '🛠️'}`.rgb(198, 98, 255));
    console.log('\n✅ Database is synchronized'.green);
}).catch((err) => {
    console.log(`\n❌ Unable to synchronize the Database => Error: ${JSON.stringify(err)}`.error);
    process.kill(process.pid);
});
const models = sequelize.models;
exports.models = models;
