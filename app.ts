import './config';
import './config/models.config';
import express from 'express';
import { Next, Req, Res, Resp } from './types/express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import useragent from 'express-useragent';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import { createServer } from 'http';
import config from './config/env.config';
import Colors = require('colors.ts');
import ejs from 'ejs';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { networkInterfaces } from 'os';
import rateLimit from 'express-rate-limit';
import { verifyApiKey } from './src/authorization/middlewares/auth.validation.middleware';
import serverCors from './server.cors.json';
import cors from 'cors';
import { Server } from 'socket.io';
import { IServer } from './types/socket';
import { authSocketMidddleware } from './services/socket';
import socketConfig from './config/sockets.config';
import routeConfig from './config/routes.config';
import ExpressMiddleware from './services/express';
import '@dulysse1/better-node';

const app = express();
const httpServer = createServer(app);
Colors.theme(config.colors);

const port = process.env.PORT;

process.env.MODELS = `${__dirname}/config/models.config.ts`;
process.env.CONFIG = `${__dirname}/config/env.config.ts`;

// set the view engine to ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(express.static('public'));

// LOGGER
app.use(morgan('dev'));

// custom token
morgan.token('localDate', function getDate(req) {
    let date = new Date();
    return date.toLocaleString()
});

// custom format, which contains a custom token
morgan.format(
    'combined', 
    ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'
);

// LOGS
app.use(morgan('combined', {
    stream: fs.createWriteStream(path.join(process.cwd(), 'logs/express.log'), { flags: 'a' }),
    skip: (req, res) => res.statusCode < 500
}));


const nets = networkInterfaces();

httpServer.on('error', onError);

// APP LISTEN
httpServer.listen(port, () => {
    console.log(`\n⮕  App listening on port ${port}`.info);
    console.log(`\n⮕  Local server: http://localhost:${port}`.rgb(249, 218, 65));
    if(nets.en1 && nets.en1.some(ip => ip.family === 'IPv4')) {
        const IP_ADDRESS = nets.en1.find(ip => ip.family === 'IPv4')?.address;
        console.log(`\n⮕  Network server: http://${IP_ADDRESS}:${port}`.rgb(249, 174, 65));
    }
});

app.use((req: Req, res: Res, next: Next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header(
        "Access-Control-Allow-Headers",
        "Accept, Authorization, Content-Type, X-Requested-With, Range, API_KEY"
    );
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    } else {
        return next();
    }
});

app.use(
    rateLimit(
        {
            windowMs: .5 * 60 * 1000, // 30 seconds
            max: 500 // limit each IP to 500 requests per windowMs
        }
    )
);

app.use(cookieParser());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(useragent.express());
app.use(compression());
app.use(responseTime());
app.use(verifyApiKey);
app.use(bodyParser.json({ limit: '100mb' }));
app.use(
    bodyParser.urlencoded(
        {
            limit: '100mb',
            extended: true,
            parameterLimit: 1000000
        }
    )
);

// SERVER CORS
app.use(cors(serverCors));


// SOCKET.IO SERVER 
const io = new Server(
    httpServer,
    {
        cors: {
            origin: '*'
        }
    }
) as IServer;

// ADD SOCKET.IO SERVER TO EXPRESS REQUEST
app.use((req: Req, res: Res, next: Next): Resp => {
    res.io = io;
    return next();
});


// load all routes (express && socket.io)
authSocketMidddleware(io);
socketConfig(io);
routeConfig(app);


app.use(ExpressMiddleware.NotFound());
app.use(ExpressMiddleware.ErrorHandler());


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
}

export default app;