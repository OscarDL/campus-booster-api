import boom from '@hapi/boom';
import Moderator, { LANGS } from '..';
import { AsyncFn } from '../../../types/express';

module ExpressModerator {

    const langs: LANGS[] = ['french', 'english', 'italian', 'spanish'];

    export function censorFor<T>(...field: (keyof T)[]): AsyncFn {
        return async(req, res, next) => {
            try {
                const moderator = new Moderator(...langs);
                await moderator.ready();
                for (let i = 0; i < field.length; i++) {
                    const f = field[i];
                    if(req.body[f.toString()]) {
                        req.body[f.toString()] = moderator.censor(req.body[f.toString()]);
                    }
                }
                return next();
            } catch (err: any) {
                console.log(`${err}`.error);
                return next(err.isBoom ? err : boom.internal(err.name));
            }
        }
    }

    export function blockFor<T>(...field: (keyof T)[]): AsyncFn {
        return async(req, res, next) => {
            try {
                const moderator = new Moderator(...langs);
                await moderator.ready();
                for (let i = 0; i < field.length; i++) {
                    const f = field[i];
                    if(req.body[f.toString()] && moderator.detect(req.body[f.toString()])?.length) {
                        return next(
                            boom.badRequest(
                                `Sorry but the ${f} field seems to be an insult.`
                            )
                        );
                    }
                }
                return next();
            } catch (err: any) {
                console.log(`${err}`.error);
                return next(err.isBoom ? err : boom.internal(err.name));
            }
        }
    }
}
export default ExpressModerator;