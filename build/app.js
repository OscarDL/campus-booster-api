"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config");
require("./config/models.config");
require("@dulysse1/better-node");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const http_1 = require("http");
const httpServer = (0, http_1.createServer)(app);
const env_config_1 = __importDefault(require("./config/env.config"));
const Colors = require("colors.ts");
Colors.theme(env_config_1.default.colors);
const express_useragent_1 = __importDefault(require("express-useragent"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const response_time_1 = __importDefault(require("response-time"));
const port = process.env.PORT;
process.env.MODELS = `${__dirname}/config/models.config.ts`;
process.env.CONFIG = `${__dirname}/config/env.config.ts`;
// set the view engine to ejs
const ejs_1 = __importDefault(require("ejs"));
app.engine('html', ejs_1.default.renderFile);
app.set('view engine', 'ejs');
app.use(express_1.default.static('public'));
const morgan_1 = __importDefault(require("morgan"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// LOGGER
app.use((0, morgan_1.default)('dev'));
// custom token
morgan_1.default.token('localDate', function getDate(req) {
    let date = new Date();
    return date.toLocaleString();
});
// custom format, which contains a custom token
morgan_1.default.format('combined', ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
// LOGS
app.use((0, morgan_1.default)('combined', {
    stream: fs_1.default.createWriteStream(path_1.default.join(process.cwd(), 'logs/express.log'), { flags: 'a' }),
    skip: (req, res) => res.statusCode < 500
}));
const os_1 = require("os");
const nets = (0, os_1.networkInterfaces)();
httpServer.on('error', onError);
// APP LISTEN
httpServer.listen(port, () => {
    var _a;
    console.log(`\n⮕  App listening on port ${port}`.info);
    console.log(`\n⮕  Local server: http://localhost:${port}`.rgb(249, 218, 65));
    if (nets.en1 && nets.en1.some(ip => ip.family === 'IPv4')) {
        const IP_ADDRESS = (_a = nets.en1.find(ip => ip.family === 'IPv4')) === null || _a === void 0 ? void 0 : _a.address;
        console.log(`\n⮕  Network server: http://${IP_ADDRESS}:${port}`.rgb(249, 174, 65));
    }
});
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header("Access-Control-Allow-Headers", "Accept, Authorization, Content-Type, X-Requested-With, Range, API_KEY");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    else {
        return next();
    }
});
// APP SECURITY
const auth_validation_middleware_1 = require("./src/authorization/middlewares/auth.validation.middleware");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
app.use((0, express_rate_limit_1.default)({
    windowMs: .5 * 60 * 1000,
    max: 500 // limit each IP to 500 requests per windowMs
}));
app.use(auth_validation_middleware_1.verifyApiKey);
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
app.use(express_useragent_1.default.express());
app.use((0, compression_1.default)());
app.use((0, response_time_1.default)());
app.use(body_parser_1.default.json({ limit: '100mb' }));
app.use(body_parser_1.default.urlencoded({
    limit: '100mb',
    extended: true,
    parameterLimit: 1000000
}));
// SERVER CORS
const server_cors_json_1 = __importDefault(require("./server.cors.json"));
const cors_1 = __importDefault(require("cors"));
app.use((0, cors_1.default)(server_cors_json_1.default));
// INIT CLOUDINARY SERVER
const cloudinary_1 = require("./services/cloudinary");
const c = env_config_1.default.cloudinary.config;
(0, cloudinary_1.CloudinaryInit)(c[env_config_1.default.env]);
// SOCKET.IO SERVER 
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*'
    }
});
// ADD SOCKET.IO SERVER TO EXPRESS REQUEST
app.use((req, res, next) => {
    res.io = io;
    return next();
});
// load all routes (express && socket.io)
const socket_1 = require("./services/socket");
const sockets_config_1 = __importDefault(require("./config/sockets.config"));
const routes_config_1 = __importDefault(require("./config/routes.config"));
(0, socket_1.authSocketMidddleware)(io);
(0, sockets_config_1.default)(io);
(0, routes_config_1.default)(app);
const express_2 = __importDefault(require("./services/express"));
app.use(express_2.default.NotFound());
app.use(express_2.default.ErrorHandler());
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.log(`\n⚠️  Port ${port} requires elevated privileges.\n`.hex('FCB64A'));
            process.exit(1);
        case 'EADDRINUSE':
            console.log(`\n⚠️  Port ${port} is already in use.\n`.hex('FCB64A'));
            process.exit(1);
        default:
            throw error;
    }
}
exports.default = app;
