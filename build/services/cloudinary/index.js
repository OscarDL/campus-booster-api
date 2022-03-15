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
exports.CloudinaryInit = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const Cloudinary = cloudinary_1.default.v2;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const logger_1 = __importDefault(require("./logs/logger"));
const logger = new logger_1.default('cloudinary.log');
/**
* Connection to cloudinary server
*
* @param config - The cloudinary config authentification
* @type Config
*
* @example
* ```js
*    init(
*        {
*            cloud_name: 'server_name',
*            api_key: 'server_key',
*            api_secret: 'server_secret'
*        }
*    );
* ```
* @return — void
*
*/
function CloudinaryInit(config) {
    return Cloudinary.config(config);
}
exports.CloudinaryInit = CloudinaryInit;
var CloudinaryService;
(function (CloudinaryService) {
    /**
    * Upload your image in Cloudinary
    *
    * @param path - The path to your file to upload
    * @type string
    *
    * @param type - The type of your file
    * @type string
    *
    * @param folder - The folder name in Cloudinary
    * @type string
    *
    * @example
    * ```js
    *    await CloudinaryService.upload('path/to/your/file', 'png', 'images');
    * ```
    * ```json
    *    {
    *       'link': 'https://cloudinary/dhzeodjzeipdj',
    *       'public_id': 'dhzeodjzeipdj'
    *    }
    * ```
    * @return — a promise with upload result
    *
    */
    const upload = (path, type, folder) => {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const publicID = yield generateID(folder);
                Cloudinary.uploader.upload(path, {
                    public_id: publicID,
                    format: type,
                    unique_filename: true,
                    return_delete_token: true
                }, (error, result) => {
                    return (error) ?
                        reject(error) :
                        resolve({
                            link: result === null || result === void 0 ? void 0 : result.secure_url,
                            public_id: publicID,
                        });
                });
            }
            catch (e) {
                return reject(e);
            }
        })).catch(err => {
            console.log(err);
            logger.writeError(`${err} - (upload)`);
            return null;
        });
    };
    /**
    * Destroy your image from Cloudinary
    *
    * @param public_id - The public key of your image
    * @type string
    *
    * @example
    * ```js
    *    await CloudinaryService.destroy('images/fd56c8eb80bb3bcb1d2421b56fdd656564858ac0b7b8ae9e17f47cae2f90ff3acbd5f45b7a2585cb754c498d9179a0b598c63cee6cafd3d44f5785c59c4d6769');
    * ```
    * @return — a promise
    *
    */
    CloudinaryService.destroy = (public_id) => {
        return new Promise((resolve, reject) => {
            try {
                Cloudinary.api.delete_resources([public_id], (error, result) => {
                    return (error) ? reject(error) :
                        resolve(result);
                });
            }
            catch (e) {
                return reject(e);
            }
        }).catch(err => {
            console.log(err);
            logger.writeError(`${err} - (destroy)`);
            return null;
        });
    };
    /**
    * Destroy all resources from a folder
    *
    * @param folder - The target folder where you will delete resources
    * @type string
    *
    * @example
    * ```js
    *    await CloudinaryService.destroyByFolder('users');
    * ```
    * @return — a promise
    *
    */
    CloudinaryService.destroyByFolder = (folder) => {
        return new Promise((resolve, reject) => {
            try {
                Cloudinary.api.delete_resources_by_prefix(`${folder}/`, (result) => {
                    return resolve(result);
                });
            }
            catch (e) {
                return reject(e);
            }
        }).catch(err => {
            console.log(err);
            logger.writeError(`${err} - (destroyByFolder)`);
            return null;
        });
    };
    /**
    * Search Cloudinary resources by folder name
    *
    * @param folder - The target folder to search
    * @type string
    *
    * @param limit - The number of resources to search
    * @type number | undefined
    *
    * @example
    * ```js
    *    await CloudinaryService.search('users', 10);
    * ```
    * @return — a promise with an array of search result
    *
    */
    CloudinaryService.search = (folder, limit) => {
        return new Promise((resolve, reject) => {
            Cloudinary.search
                .expression(`folder:${folder}`)
                .sort_by('public_id', 'desc')
                .max_results(limit)
                .execute()
                .then((result) => resolve(result))
                .catch(err => reject(err));
        }).catch(err => {
            console.log(err);
            logger.writeError(`${err} - (search)`);
            return null;
        });
    };
    /**
    * Search Cloudinary resources
    *
    * @param limit - The number of resources to search
    * @type number | undefined
    *
    * @example
    * ```js
    *    await CloudinaryService.resources(10);
    * ```
    * @return — a promise with an array of search result
    *
    */
    CloudinaryService.resources = (limit) => {
        return new Promise((resolve, reject) => {
            Cloudinary.api.resources({
                max_results: limit,
                all: true,
            }, (error, result) => {
                return (error) ? reject(error) : resolve(result);
            });
        }).catch(err => {
            console.log(err);
            logger.writeError(`${err} - (resources)`);
            return null;
        });
    };
    const generateID = (folder) => {
        return new Promise((resolve, reject) => {
            const KEY_GEN = `${folder}/${crypto_1.default.randomBytes(64).toString('hex')}`;
            CloudinaryService.search(folder).then((res) => {
                (res) ?
                    (res.resources.some(resource => {
                        return resource.public_id === KEY_GEN;
                    })) ? generateID(folder) : resolve(KEY_GEN) :
                    resolve(KEY_GEN);
            }).catch(err => reject(err));
        });
    };
    /**
    * Upload an image in Cloudinary
    *
    * @param file - a multer file (image)
    * @type Express.Multer.File
    *
    * @param folder - The folder name in Cloudinary
    * @type string
    *
    * @example
    * ```js
    *    await CloudinaryService.uploadImage(req.file, 'users');
    * ```
    * ```json
    *    {
    *       'link': 'https://cloudinary/users/7c47024fc059a6b8072b59762986ca51f75d662323870338bff495158cb9bc8ca28682d81dcdb48912e3d385387aea123b71b82af54f55ffc59a396568f10d69',
    *       'public_id': 'users/7c47024fc059a6b8072b59762986ca51f75d662323870338bff495158cb9bc8ca28682d81dcdb48912e3d385387aea123b71b82af54f55ffc59a396568f10d69'
    *    }
    * ```
    * @return — a promise with an upload result
    *
    */
    CloudinaryService.uploadFile = (file, folder) => {
        return new Promise((resolve, reject) => {
            const TempFileUri = path_1.default.join(__dirname, 'resources', `${crypto_1.default.randomBytes(32).toString('hex')}.${file.mimetype}`);
            fs_1.default.writeFile(TempFileUri, file.buffer, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return reject(err);
                const Upload = yield upload(TempFileUri, file.mimetype, folder);
                fs_1.default.rmSync(TempFileUri);
                return resolve(Upload);
            }));
        }).catch(err => {
            console.log(err);
            logger.writeError(`${err} - (uploadImage)`);
            return null;
        });
    };
})(CloudinaryService || (CloudinaryService = {}));
exports.default = CloudinaryService;
