import UglifyJS, { MinifyOptions } from 'uglify-js';
import fs from 'fs';

const SRC_DIR: string = 'build';
const options: MinifyOptions = {};

const createMinFiles = (directory: string): void => {
    fs.readdirSync(directory).forEach(function (file: string) {
        if (fs.lstatSync(directory + '/' + file).isDirectory()) {
            if (!fs.existsSync(directory + '/' + file)){
                fs.mkdirSync(directory + '/' + file);
            }
            createMinFiles(directory + '/' + file);
        } else {
            if(file.split('.').pop() === 'js') {
                const FILE = {} as any;
                FILE[file] = fs.readFileSync(directory + '/' + file, 'utf8');
                fs.writeFileSync(directory + '/' + file, UglifyJS.minify(FILE, options).code, 'utf8');
            } else {
                fs.writeFileSync(directory + '/' + file, fs.readFileSync(directory + '/' + file, 'utf8'), 'utf8');
            }
        }
    });
}

createMinFiles(SRC_DIR);

