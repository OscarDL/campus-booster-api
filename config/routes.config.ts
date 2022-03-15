import fs from 'fs';
import path from 'path';
import { Application } from 'express';
const validFileName = [ 'routes.config.ts', 'routes.config.js'];


const requireFiles = function(directory: string, app: Application): void {
    fs.readdirSync(directory).forEach(fileName => {
        // Recurse if directory
        if (fs.lstatSync(`${directory}/${fileName}`).isDirectory()) {
            requireFiles(`${directory}/${fileName}`, app);
        } else {
            // Skip this file
            if (validFileName.includes(fileName) && directory === __dirname) return;
            // Skip this file
            if (!validFileName.includes(fileName)) return;
            require(`${directory}/${fileName}`).default(app);
        }
    });
}

export default function(app: Application): void {
    return requireFiles(
        path.normalize(`${__dirname}/../src`), 
        app
    );
}