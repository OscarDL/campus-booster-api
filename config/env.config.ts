export default {
    env: process.env.NODE_ENV || 'development',
    app_name: process.env.APP_NAME || 'Campus Booster - API',
    app_site: process.env.APP_SITE || 'http://localhost:3000',
    app_uri: process.env.APP_URI || 'http://localhost:1337',
    route_prefix: process.env.ROUTE_PREFIX || '/api/v1',
    author: process.env.AUTHOR || 'Campus Booster',
    jwtSecret: process.env.JWT_SECRET || '',
    jwtOptions: {
        expiresIn: process.env.JWT_EXPIRES || '30m' // expires after 30 minutes
    },
    cookieExpires: Number(process.env.COOKIE_EXPIRES) || 1800000, // 30 minutes in milliseconds
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
        User: 1,
        Professor: 2,
        FullProfessor: 3,
        Company: 4,
        Assistant: 5,
        CampusManager: 6,
        CampusBoosterAdmin: 7
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