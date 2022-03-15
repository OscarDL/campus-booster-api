"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    API_KEY: process.env.API_KEY || '40059cec-aa34-4a43-b182-5d1262a908ce',
    env: process.env.NODE_ENV || 'development',
    app_name: process.env.APP_NAME || 'AD jardin',
    android_version: process.env.ANDROID_VERSION || 1.0,
    ios_version: process.env.IOS_VERSION || 1.0,
    app_site: process.env.APP_SITE || 'http://localhost:8080',
    app_uri: process.env.APP_URI || 'http://127.0.0.1:1337',
    author: process.env.AUTHOR || 'Frederic Dupont',
    jwtSecret: process.env.JWT_SECRET || '?Nq>w#}cGz]7mI_(H.D:!0D54l',
    jwtOptions: {
        expiresIn: process.env.JWT_EXPIRES || '30m' // expires in 30 minutes
    },
    colors: {
        MLG: ['rainbow', 'bold'],
        input: 'magenta',
        verbose: 'cyan',
        prompt: 'grey',
        info: ['blue', 'italic'],
        data: 'blue',
        help: 'cyan',
        logs: ['grey', 'italic'],
        warning: 'brightRed',
        debug: ['yellow', 'bold'],
        error: ['red', 'bold'],
        success: 'green'
    },
    permissionLevel: {
        Banned: 0,
        Restricted: 1,
        Standard: 100,
        Certified: 500,
        Admin: 4000,
        Boss: 4096,
    },
    cloudinary: {
        config: {
            development: {
                cloud_name: 'hmn0aadds',
                api_key: '224867781366997',
                api_secret: '60uf7BAGS1_GT6Oq6yMHLh_Df5k'
            },
            production: {
                cloud_name: 'hmn0aadds',
                api_key: '224867781366997',
                api_secret: '60uf7BAGS1_GT6Oq6yMHLh_Df5k'
            }
        },
        Avatar: {
            default: 'https://res.cloudinary.com/hmn0aadds/image/upload/v1639760295/public/sbcf-default-avatar_ujsglo.png'
        },
        Application: {
            default: 'https://res.cloudinary.com/hmn0aadds/image/upload/v1640256420/public/icon_ucjx1u.png'
        }
    },
    mailing: {
        config: {
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: 'adj.apirest@gmail.com',
                pass: `!i9M{v}#c=(ChvFLih}<`
            },
            secure: false,
            tls: {
                ciphers: 'SSLv3'
            },
            pool: true,
            maxConnections: 2
        },
        as: 'support@adj.com'
    },
    encryption: {
        algorithm: 'aes-256-cbc',
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfU',
        IV_LENGTH: 16,
    },
    customRegex: {
        regInt: '([0-9]{0,9})',
        regHex: '([0-9a-fA-F]{0,30})',
        regUuidv4: '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'
    },
    MINIMUM_CREATION_ACCOUNT_LEGAL_AGE: 13
};
