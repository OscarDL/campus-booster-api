import boom from '@hapi/boom';
import { AsyncFn, Req, Res, Next, Resp, Fn } from '../../types/express';


export function ExpressErrorHandler(err: any): AsyncFn {
    return async(req: Req, res: Res, next: Next) : Promise<Resp> => {
        const Errors: string[] = err.stack.split('\n');
        const Infos: string[] = Errors[1].split(':');
        const fileName = Infos[0].split('/').pop();
        const [ col, line ] = [ Infos[1], Infos[2] ];
        console.log(`${err}`.error);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export default abstract class ExpressMiddlewares {

    static NotFound(): Fn {
        return (req: Req, res: Res): Resp => {
            return res.status(404).json(
                { 
                    statusCode: 404, 
                    message: 'Not Found' 
                }
            );
        } 
    }

    static ErrorHandler(): any {
        return (err: any, req: Req, res: Res, next: Next): Resp => {
            if (err.isBoom) {
                return res.status(err.output.statusCode).json(err.output.payload);
            } else {
                return res.status(500).json(
                    {
                        statusCode: 500,
                        error: 'Internal',
                        message: `${err.name}: ${err.message}`,
                    }
                );
            }
        }
    }
} 
