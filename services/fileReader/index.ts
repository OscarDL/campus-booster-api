import fs from 'fs';

/**
*  Typescript JSON reader/decoder
*  @author Ulysse Dupont
*/
export default class JsonReader<
    T extends JsonReader.Path,
    K extends keyof T
> {

    protected _path: K;

    constructor(path: K) {
        this._path = path;
    }

    private readerAsync<T>(): Promise<T> {
        return new Promise((resolve, reject) => {
            fs.readFile(
                this._path.toString(),
                (err, data) => {
                    return (err) ? reject(err) : resolve(JSON.parse(data.toString()));
                }
            )
        });
    }

    private readerSync<T>(): T {
        return JSON.parse(
            fs.readFileSync(
                this._path.toString()
            ).toString()
        );
    }
    
    /**
     * Read your file content synchronously
     */
    public decodeSync(): T[K] {
        return this.readerSync<T[K]>();
    }

    /**
     * Read your file content asynchronously
     */
    public decodeAsync(): Promise<T[K]> {
        return this.readerAsync<T[K]>();
    }
}
namespace JsonReader {
    export interface Path {
        '/Users/ulyssedupont/Desktop/ulysse/PERSO/PROMISE/api/server.cors.json': {
            allowedHeaders: string[];
            origin: string[];
            credentials: boolean;
            methods: string[];
            exposedHeaders: string[];
        };
    }
}