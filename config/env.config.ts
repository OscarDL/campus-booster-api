export default {
    API_KEY: process.env.API_KEY || '957ba5e9-aa16-4ef7-ac3c-8daf1694c951',
    env: process.env.NODE_ENV || 'development',
    app_name: process.env.APP_NAME || 'api',
    android_version: process.env.ANDROID_VERSION || 1.0,
    ios_version: process.env.IOS_VERSION || 1.0,
    app_site: process.env.APP_SITE || 'http://localhost:8080',
    app_uri: process.env.APP_URI || 'http://127.0.0.1:1337',
    author: process.env.AUTHOR || 'Promise',
    jwtSecret: process.env.JWT_SECRET || '?Nq>w#}cGz]7mI_(H.D:!0D54l',
    jwtOptions: {
        expiresIn: process.env.JWT_EXPIRES || '30m' // expires in 30 minutes
    },
    colors: {
        MLG: [ 'rainbow', 'bold' ],
        input: 'magenta',
        verbose: 'cyan',
        prompt: 'grey',
        info: [ 'blue', 'italic' ],
        data: 'blue',
        help: 'cyan',
        logs: [ 'grey', 'italic' ],
        warning: 'brightRed',
        debug: [ 'yellow', 'bold' ],
        error: ['red', 'bold' ],
        success: 'green'
    },
    permissionLevel: {
        Banned: 0,
        Restricted: 1,
        Student: 100,
        Formateur: 500,
        Admin: 4000,
        Boss: 4096,
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
}