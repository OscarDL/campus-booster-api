
import 'colors.ts';
import '@dulysse1/better-node';
import './config';
import S from './config/models.config';
S.login();

import fs from 'fs';
import cors from 'cors';
import http from 'http';
import path from 'path';
import https from 'https';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { Server } from 'socket.io';
import compression from 'compression';
import { i18n } from './services/i18n';
import { networkInterfaces } from 'os';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import { exec } from "node:child_process";
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';

import { IServer } from './types/socket';
import routeConfig from './config/routes.config';
import socketConfig from './config/sockets.config';
import ExpressMiddleware from './services/express';
import { Next, Req, Res, Resp } from './types/express';
import { authSocketMiddleware } from './services/socket';
import swaggerDevDocument from './services/swagger/development.json';
import swaggerProdDocument from './services/swagger/production.json';

let server;
const app = express();
const isProduction = process.env.NODE_ENV === 'production';

async function execShell(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => exec(cmd, (err, out) => err ? reject(err) : resolve(out)));
}

function devHttpsServer(key: string, cert: string, port: number): void {
    server = https.createServer({key, cert}, app);
    server.listen(port, () => {
        console.log(`\n⮕  App listening on port ${port}`.green);
        console.log(`\n⮕  Local server: https://localhost:${port}`.yellow);
    
        const nets = networkInterfaces();
        if (nets.en1 && nets.en1.some(ip => ip.family === 'IPv4')) {
            const IP_ADDRESS = nets.en1.find(ip => ip.family === 'IPv4')?.address;
            console.log(`\n⮕  Network server: https://${IP_ADDRESS}:${port}`.blue);
        }
        console.log(`\n⮕  Documentation:  https://localhost:${port}/doc`.cyan);
    });
    server.on('error', (error) => onError(error, port));
}
const port = Number(process.env.PORT);

if (!isProduction) {
    let key, cert;
    try {
        key = fs.readFileSync('key.pem', 'utf8');
        cert = fs.readFileSync('cert.pem', 'utf8');
    } catch (err) {
        void 0;
    }
    if(!key || !cert) {
        console.log("Https certificate creation...".blue);
        execShell("mkcert -key-file key.pem -cert-file cert.pem localhost").then(out => {
            key = fs.readFileSync('key.pem', 'utf8');
            cert = fs.readFileSync('cert.pem', 'utf8');
            console.log(out.info);
            devHttpsServer(key, cert, port);
        }).catch(() => {
            console.log("mkcert error or missing install.".red.bold);
            process.exit(1);
        });
    } else {
        devHttpsServer(key, cert, port);
    }
} else {
    server = http.createServer(app);
    server.listen(port, () => {
        console.log(`\n⮕  App listening on port ${port}`.info);
        console.log(`\n⮕  Local server: https://localhost:${port}`.yellow);
    
        const nets = networkInterfaces();
        if (nets.en1 && nets.en1.some(ip => ip.family === 'IPv4')) {
            const IP_ADDRESS = nets.en1.find(ip => ip.family === 'IPv4')?.address;
            console.log(`\n⮕  Network server: https://${IP_ADDRESS}:${port}`.yellow);
        }
        console.log(`\n⮕  Documentation:  https://localhost:${port}/doc`.cyan);
    });
    server.on('error', (error) => onError(error, port));
}

// app security config
const corsOpts: cors.CorsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range', 'Lang', 'X-Forwarded-Proto'
    ],
    exposedHeaders: [
        'Content-Length'
    ],
    origin: !isProduction ? [
        'https://localhost:3000'
    ] : [
        process.env.CLIENT_URL ?? ''
    ]
};

const contentSecurityPolicy = {
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"]
    }
};

// Setup base config & models
process.env.MODELS = `${__dirname}/config/models.config.ts`;
process.env.CONFIG = `${__dirname}/config/env.config.ts`;


// Morgan Logger
app.use(morgan('dev'));

// custom token
morgan.token('localDate', function getDate(req) {
    let date = new Date();
    return date.toLocaleString()
});

// custom format, which contains the custom token
morgan.format(
    'combined', 
    ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(process.cwd(), 'logs/express.log'), { flags: 'a' }),
    skip: (req, res) => res.statusCode < 500
}));


// Security middleware
app.use(rateLimit({
    windowMs: 60000, // 60 seconds
    max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(cors(corsOpts));
app.use(helmet.contentSecurityPolicy(contentSecurityPolicy));

// Miscellaneous middleware
app.use(compression());
app.use(cookieParser());
app.use(responseTime());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/swagger/api-docs', swaggerUi.serve, swaggerUi.setup(!isProduction ? swaggerDevDocument : swaggerProdDocument));

// Socket.io instance
const io = new Server(
    server,
    {
        cors: corsOpts
    }
) as IServer;

// Add socket.io instance to express requests
app.use((req: Req, res: Res, next: Next): Resp => {
    res.io = io;
    return next();
});

// set up i18n
app.use((req: Req, res: Res, next: Next): Resp  => {
    i18n.init(req, res);
    return next();
});


// load all routes (express & socket.io)
authSocketMiddleware(io);
socketConfig(io);
routeConfig(app);

app.use(ExpressMiddleware.NotFound());
app.use(ExpressMiddleware.ErrorHandler());

function onError(error: any, port: number): never {
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
};


export default app;