import csv from 'csvtojson';
import path from 'path';
import '@dulysse1/better-node';

const Langs = <const> {
    french: 'french.csv',
    english: 'english.csv',
    italian: 'italian.csv',
    spanish: 'spanish.csv'
}

type UniqueArray<T> =
    T extends readonly [infer X, ...infer Rest]
    ? InArray<Rest, X> extends true
        ? ['Encountered value with duplicates:', X]
        : readonly [X, ...UniqueArray<Rest>]
    : T;

type InArray<T, X> =
    T extends readonly [X, ...infer _Rest]
    ? true
    : T extends readonly [X]
        ? true
        : T extends readonly [infer _, ...infer Rest]
    ? InArray<Rest, X>
    : false;

async function getPkgJsonDir () {
    const { dirname } = require ( 'path' );
    const { constants, promises: { access } } = require ( 'fs' );
    for ( let path of module.paths ) {
        try {
            let prospectivePkgJsonDir = dirname ( path );
            await access ( path, constants.F_OK );
            return prospectivePkgJsonDir;
        } catch ( e ) {}
    }
}

export type LANGS = UniqueArray<keyof typeof Langs>;

/**
* Moderator for banned words into a sentence
* @author Ulysse Dupont
*/
export default class Moderator<
    T extends typeof Langs,
    K extends keyof T,
    U extends UniqueArray<K>
> {

    protected _dir!: string;
    protected _langs: U[];
    protected _words: string[] = [];
    protected _lockedChar = " /%!?;.,$=+-'#~&)°([]{}_"

    /**
     * ### constructor
     * @param langs choose your language(s)
     */
    constructor(...langs: U[]) {
        this._langs = [...new Set(langs)];  
    }

    protected getWordsFromLang(lang: U): Promise<{ field1: string; }[]> {
        return new Promise(async(resolve) => {
            csv(
                {
                    delimiter: ',',
                    ignoreEmpty: true,
                    noheader: true,
                    downstreamFormat: 'array'      
                }
            ).fromFile(
                path.join(
                    await getPkgJsonDir(),
                    '/services/moderator/lang/',
                    Langs[lang as keyof typeof Langs],
                )
            ).then(resolve);
        });
    }

    protected replaceStringAt(text: string, index: number, replacement: string): string {
        return text.slice(0, index) + replacement + text.slice(index + replacement.length);
    }

    /**
     * LOAD RESOURCES FOR BANNED WORDS
     */
    public async ready(): Promise<this> {
        if(!this._words.length) {
            for (let i = 0; i < this._langs.length; i++) {
                const lang = this._langs[i];
                this._words.push(
                    ...(await this.getWordsFromLang(lang)).map(csv => csv.field1)
                );
            }
        }
        return this;
    }

    protected detectWord(text: string, w: string): boolean {
        return (
            text.toLocaleLowerCase().includes(
                w.toLocaleLowerCase()
            ) &&
            ( 
                this._lockedChar.includes(text[
                    text.toLocaleLowerCase().indexOf(
                        w.toLocaleLowerCase()
                    ) + w.length
                ]) ||
                text.toLocaleLowerCase().indexOf(
                    w.toLocaleLowerCase()
                ) + w.length === text.length
            ) && (
                this._lockedChar.includes(text[
                    text.toLocaleLowerCase().indexOf(
                        w.toLocaleLowerCase()
                    ) - 1
                ]) ||
                text.toLocaleLowerCase().indexOf(
                    w.toLocaleLowerCase()
                ) === 0
            )
        );
    }

    /**
     * 
     * @param text Your text where you want to detect insult
     */
    public detect(text: string): string[] | undefined {
        return this._words.filter(w => {
            return (
                this.detectWord(text, w)
            );
        });
    }

    /**
     * 
     * @param text The text where you want to censor insult
     */
    public censor(text: string): string {
        const words = this.detect(text)!;
        let filteredText = text.slice();
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            while(this.detectWord(filteredText, word)) {
                filteredText = this.replaceStringAt(
                    filteredText,
                    filteredText.toLocaleLowerCase().indexOf(word.toLocaleLowerCase()) + 1,
                    '*'.repeat(word.length - 1)
                );
            }
        }
        return filteredText;
    }
}