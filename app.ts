import './config';
import './config/models.config';

import fs from 'fs';
import cors from 'cors';
import http from 'http';
import path from 'path';
import https from 'https';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { theme } from 'colors.ts';
import { Server } from 'socket.io';
import compression from 'compression';
import { networkInterfaces } from 'os';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import rateLimit from 'express-rate-limit';

import { IServer } from './types/socket';
import config from './config/env.config';
import routeConfig from './config/routes.config';
import socketConfig from './config/sockets.config';
import ExpressMiddleware from './services/express';
import { Next, Req, Res, Resp } from './types/express';
import { authSocketMidddleware } from './services/socket';

import '@dulysse1/better-node';


let server;
theme(config.colors);
const app = express();


if (process.env.NODE_ENV === 'development') {

    const port = Number(process.env.PORT);
    const key = fs.readFileSync('key.pem', 'utf8');
    const cert = fs.readFileSync('cert.pem', 'utf8');

    server = https.createServer({key, cert}, app);
    
    server.listen(port, () => {
        console.log(`\n⮕  App listening on port ${port}`.info);
        console.log(`\n⮕  Local server: https://localhost:${port}`.rgb(249, 218, 65));
    
        const nets = networkInterfaces();
        if (nets.en1 && nets.en1.some(ip => ip.family === 'IPv4')) {
            const IP_ADDRESS = nets.en1.find(ip => ip.family === 'IPv4')?.address;
            console.log(`\n⮕  Network server: https://${IP_ADDRESS}:${port}`.rgb(249, 174, 65));
        }
    });

    server.on('error', (error) => onError(error, port));

} else {

    const clientPath = path.join(__dirname, path.sep, '..', path.sep, 'client', 'build');

    app.use(express.static(clientPath));
    app.get('*', (_, res) => res.sendFile(path.join(clientPath, 'index.html')));

    server = http.createServer(app);

}


// app security config
const corsOpts: cors.CorsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
        'Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range', 'Lang'
    ],
    exposedHeaders: [
        'Content-Length'
    ],
    origin: process.env.NODE_ENV === 'development' ? [
        'http://localhost:3000', 'https://localhost:3000'
    ] : [
        // Add production domain when ready
    ]
};

const contentSecurityPolicy = {
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'fonts.googleapis.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", 'fonts.gstatic.com'],
        imgSrc: ["'self'"],
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
    windowMs: 30000, // 30 seconds
    max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(cors(corsOpts));
app.use(helmet.contentSecurityPolicy(contentSecurityPolicy));

// Miscellaneous middleware
app.use(compression());
app.use(cookieParser());
app.use(responseTime());
app.use(express.json({ limit: '100mb' }));


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


// load all routes (express & socket.io)
authSocketMidddleware(io);
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