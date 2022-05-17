export default {
    env: process.env.NODE_ENV || 'development',
    app_name: process.env.APP_NAME || 'Campus Booster - API',
    app_domaine: process.env.APP_DOMAINE || "campusbooster.eu",
    app_site: process.env.APP_SITE || 'http://localhost:3000',
    app_uri: process.env.APP_URI || 'http://localhost:1337',
    route_prefix: process.env.ROUTE_PREFIX || '/api/v1',
    author: process.env.AUTHOR || 'Campus Booster',
    jwtSecret: process.env.JWT_SECRET || '',
    jwtOptions: {
        expiresIn: process.env.JWT_EXPIRES || '30m' // expires after 30 minutes
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
        Student: "STUDENT",
        Professor: "PROFESSOR",
        FullProfessor: "FULL_PROFESSOR",
        Company: "COMPANY",
        Assistant: "ASSISTANT",
        CampusManager: "CAMPUS_MANAGER",
        CampusBoosterAdmin: "CAMPUS_BOOSTER_ADMIN"
    },
    encryption: {
        algorithm: 'aes-256-cbc',
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY || 'E)H@MbQeThWmZq4t7w!z%C*F-JaNdRfU',
        IV_LENGTH: 16,
    },
    aws: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET
    },
    customRegex: {
        regInt: '([0-9]{0,9})',
        regHex: '([0-9a-fA-F]{0,30})',
        regUuidv4: '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'
    }
}