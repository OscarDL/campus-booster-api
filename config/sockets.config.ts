import fs from 'fs';
import path from 'path';
import { IServer, ISocket } from '../types/socket';
const validFileName = [ '.socket.ts', '.socket.js' ];

const importFiles = function(directory: string, io: IServer): void {
    io.on("connect", (socket: ISocket): void => {
        fs.readdirSync(directory).forEach(function(file) {
            // Recurse if directory
            if (fs.lstatSync(directory + '/' + file).isDirectory()) {
                importFiles(directory + '/' + file, io);
            } else {
                // Skip this file
                if (!validFileName.includes(file.slice(-10))) return;
                require(`${directory}/${file}`).default(socket);
            }
        });
    });
}

export default function(io: IServer): void {
    return importFiles(
        path.join(`${__dirname}/../src`), 
        io
    );
}