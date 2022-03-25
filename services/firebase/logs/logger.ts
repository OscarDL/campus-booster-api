import fs from 'fs';
import path from 'path';

export default class Logger {

    protected fileName: string;

    constructor(fileName: string) {
        this.fileName = path.join(__dirname, fileName);
        if(!fs.existsSync(this.fileName)) {
            fs.closeSync(fs.openSync(this.fileName, 'w'))
        }
    }

    public writeError(log: string): void {
        return fs.appendFileSync(
            this.fileName, 
            `[${new Date().toLocaleString()}] ${log}\n`
        );
    }
}
