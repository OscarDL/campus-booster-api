import { Req, Res, Next, Resp, AsyncFn } from '../../../types/express';
import boom from '@hapi/boom';
import { ExpressErrorHandler } from '../../../services/express';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export declare type ParameterTypes = 
    'integer' | 
    'float' | 
    'string' | 
    'array' | 
    'object' | 
    'boolean' | 
    'email' | 
    'enum' | 
    'date';


const checkType = (data: any, type: ParameterTypes, enumOptions?: Array<any>): boolean | never => {
    switch (type) {
        case 'enum':
            return (
                enumOptions!.some(
                    e => e == data
                )
            );
        case 'integer':
            return (typeof data === 'number' && 
                Number.isInteger(Number(data)) &&
                Math.floor(Number(data)) === Number(data) &&
                Number(data) >= 0 &&
                Number(data).toString().length <= 9
            );
        case 'float':
            return (
                typeof data === 'number' &&
                parseFloat(`${data}`) === data &&
                (/^\d*(\.\d+)?$/.test(`${data}`)) 
            );    
        case 'string':
            return (typeof data === 'string'); 
        case 'array':
            return (typeof data === 'object' && Array.isArray(data));
        case 'object':
            return (typeof data === 'object' && !Array.isArray(data));
        case 'boolean':    
            return (typeof data === 'boolean');
        case 'email':
            return (typeof data === 'string' && EMAIL_REGEX.test(data));
        case 'date': 
            return (typeof data === "string" && new Date(data).toString() != "Invalid Date")
        default:
            throw new Error('Type de paramètre inconnu.');
    }
}

const parseNumber = (p: any) : number => {
    return (typeof p === 'string' && !(/^\d*(\.\d+)?$/.test(p))) ? NaN : parseFloat(p);
}


export function queryParametersNeeded(params: string | string[], type: ParameterTypes, enumOptions?: Array<any>): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(typeof params === 'string') {
                return (req.query[params]) ?
                    (checkType((['float', 'integer'].includes(type)) ? parseNumber(req.query[params]) : req.query[params], type, enumOptions)) ?
                        next() : 
                        next(boom.badRequest(`${params}_format`)) : 
                        next(boom.badRequest(`${params}_missing`));
            } else if(typeof params === 'object' && Array.isArray(params)) {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if(!req.query[param]) {
                        return next(boom.badRequest(`${param}_missing`));
                    } else if(!checkType((['float', 'integer'].includes(type)) ? parseNumber(req.query[param]) : req.query[param], type, enumOptions)) {
                        return next(boom.badRequest(`${param}_format`)); 
                    }  
                }
                return next();
            } else {
                return next(boom.badGateway('incorrect_param'));
            }
        } catch (err: any) {
            return await ExpressErrorHandler(err)(req, res, next); 
        }
    }
}

export function paramParametersNeeded(params: string | string[], type: ParameterTypes, enumOptions?: Array<any>): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(typeof params === 'string') {
                return (req.params[params]) ?
                    (checkType((['float', 'integer'].includes(type)) ? parseNumber(req.params[params]) : req.params[params], type, enumOptions)) ?
                    next() : 
                    next(boom.badRequest(`${params}_format`)) : 
                    next(boom.badRequest(`${params}_missing`));
            } else if(typeof params === 'object' && Array.isArray(params)) {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if(!req.params[param]) {
                        return next(boom.badRequest(`${param}_missing`));
                    } else if(!checkType((['float', 'integer'].includes(type)) ? parseNumber(req.params[param]) : req.params[param], type, enumOptions)) {
                        return next(boom.badRequest(`${param}_format`)); 
                    }  
                }
                return next();
            } else {
                return next(boom.badGateway('incorrect_param'));
            }
        } catch (err: any) {
            return await ExpressErrorHandler(err)(req, res, next); 
        }
    }
}

export function bodyParametersNeeded(params: string | string[], type: ParameterTypes, enumOptions?: Array<any>): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            if(typeof params === 'string') {
                return (req.body[params] || [false, 0].includes(req.body[params])) ?
                    (checkType(req.body[params], type, enumOptions)) ?
                    next() : 
                    next(boom.badRequest(`${params}_format`)) : 
                    next(boom.badRequest(`${params}_missing`));
            } else if(typeof params === 'object' && Array.isArray(params)) {
                for (let i = 0; i < params.length; i++) {
                    const param = params[i];
                    if(!req.body[param] && ![false, 0].includes(req.body[param])) {
                        return next(boom.badRequest(`${param}_missing`));
                    } else if(!checkType(req.body[param], type, enumOptions) && ![false, 0].includes(req.body[param])) {
                        return next(boom.badRequest(`${param}_format`)); 
                    }  
                }
                next();
            } else {
                return next(boom.badGateway('incorrect_param'));
            }
        } catch (err: any) {
            return await ExpressErrorHandler(err)(req, res, next); 
        }
    }
}

/////// HOPE ////////

export function queryParameterHoped(param: string, type: ParameterTypes, enumOptions?: Array<any>): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            return (req.query[param]) ? queryParametersNeeded(param, type, enumOptions)(req, res, next) : next();
        } catch (err: any) {
            return await ExpressErrorHandler(err)(req, res, next); 
        }
    };
}

export function bodyParameterHoped(param: string, type: ParameterTypes, enumOptions?: Array<any>): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            return (req.body[param]) ? bodyParametersNeeded(param, type, enumOptions)(req, res, next) : next();
        } catch (err: any) {
            return await ExpressErrorHandler(err)(req, res, next); 
        }
    };
}

export function paramParameterHoped(param: string, type: ParameterTypes, enumOptions?: Array<any>): AsyncFn {
    return async(req: Req, res: Res, next: Next): Promise<Resp> => {
        try {
            return (req.params[param]) ? paramParametersNeeded(param, type, enumOptions)(req, res, next) : next();
        } catch (err: any) {
            return await ExpressErrorHandler(err)(req, res, next); 
        }
    };
}