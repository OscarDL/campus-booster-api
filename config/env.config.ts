const env = process.env.NODE_ENV || 'development';
export default {
    env,
    db_schema: env === 'development' ? 'dev' : 'prod',
    app_name: process.env.APP_NAME || 'Campus Booster - API',
    app_domain: process.env.APP_DOMAIN || "campusbooster.eu",
    app_site: process.env.APP_SITE || 'https://localhost:3000',
    app_uri: process.env.CLIENT_URL || 'https://localhost:1337',
    route_prefix: env === 'development' ? '/api/v1' : '',
    author: process.env.AUTHOR || 'Campus Booster',
    jwtSecret: process.env.JWT_SECRET || '',
    jwtOptions: {
        expiresIn: process.env.JWT_EXPIRES || '30m' // expires after 30 minutes
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
    customRegex: {
        regInt: '([0-9]{0,9})',
        regHex: '([0-9a-fA-F]{0,30})',
        regUuidv4: '([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})'
    }
}