import fs from 'fs';
import path from 'path';

const file: string = fs.readFileSync(
    path.join(__dirname, 'domains.txt')
).toString();

fs.writeFileSync(
    path.join(__dirname, 'domains.json'),
    JSON.stringify(file.split('\n')),
    {
        encoding: 'utf-8'
    }
);