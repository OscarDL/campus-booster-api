import './config';
import './config/models.config';

import fs from 'fs';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import { theme } from 'colors.ts';
import { Server } from 'socket.io';
import { createServer } from 'http';
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


theme(config.colors);
const app = express();
const httpServer = createServer(app);


// app security config
const corsOpts: cors.CorsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Accept', 'Authorization', 'Content-Type', 'X-Requested-With', 'Range'
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
    httpServer,
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


// Start server instance
const port = process.env.PORT;
httpServer.on('error', onError);

httpServer.listen(port, () => {
    console.log(`\n⮕  App listening on port ${port}`.info);
    console.log(`\n⮕  Local server: http://localhost:${port}`.rgb(249, 218, 65));

    const nets = networkInterfaces();
    if(nets.en1 && nets.en1.some(ip => ip.family === 'IPv4')) {
        const IP_ADDRESS = nets.en1.find(ip => ip.family === 'IPv4')?.address;
        console.log(`\n⮕  Network server: http://${IP_ADDRESS}:${port}`.rgb(249, 174, 65));
    }
});


function onError(error: any): never {
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