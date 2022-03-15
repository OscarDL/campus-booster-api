import { Req, Res, Next, Resp, ReqJWT } from '../../../types/express';
import config from '../../../config/env.config';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import boom from '@hapi/boom';
import * as UserService from '../../users/service/user.service';
import { ExpressErrorHandler } from '../../../services/express';

export async function validRefreshToken(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
    const b = Buffer.from(req.body?.refreshToken, 'base64');
    const refreshToken = b.toString();
    const refreshId = req.jwt?.id + config.jwtSecret;
    const hash = crypto
      .createHmac('sha512', req.jwt?.refreshKey)
      .update(refreshId)
      .digest('base64');
    if (hash === refreshToken) {
      req.body = { 
        id: req.jwt?.id, 
        refreshKey: req.jwt?.refreshKey 
      };
      return next();
    }
    return next(boom.badRequest('Jeton d\'actualisation non valide.'));
  } catch (err) {
    return await ExpressErrorHandler(err)(req, res, next); 
  }
};

export async function validJWTNeeded(req: Req, res: Res, next: Next): Promise<Resp> {
  if (req.headers?.authorization) {
    try {
      const authorization = req.headers?.authorization.split(' ');
      if (authorization[0] !== 'Bearer') {
        return next(boom.badRequest('Vous devez fournir un bearer token.'));
      } else {
        req.jwt = jwt.verify(
          authorization[1],
          config.jwtSecret,
          config.jwtOptions as VerifyOptions
        ) as ReqJWT;
        req.user = await UserService.findById(req.jwt.id, {}, 'all');
        return (req.user) ? next() : next(boom.unauthorized('Votre session a expiré !'));
      }
    } catch (err: any) {
      console.log(`${err}`.error);
      return next(boom.unauthorized('Votre session a expiré !'));
    }
  } else {
    return next(boom.badRequest('Aucune autorisation En-tête fourni.'));
  }
};

export async function JWTNeeded(req: Req, res: Res, next: Next): Promise<Resp> {
  if (req.headers?.authorization) {
    try {
      const authorization = req.headers.authorization.split(' ');
      if (authorization[0] !== 'Bearer') {
        return next(boom.badRequest('Vous devez fournir un bearer token.'));
      } else {
        req.jwt = jwt.decode(
          authorization[1]
        ) as ReqJWT;
        req.user = await UserService.findById(req.jwt?.id);
        return next();
      }
    } catch (err: any) {
      return await ExpressErrorHandler(err)(req, res, next);
    }
  } else {
    next(boom.badRequest('Aucune autorisation En-tête fourni.'));
  }
};


export function verifyApiKey(req: Req, res: Res, next: Next): Resp {
  // byepass API_KEY 
  let exeptions: string[] = [
    
  ];

  if(req.method === "OPTIONS") return res.sendStatus(200);
  if(req.url && exeptions.includes(req.url.split('?')[0])) {
    return next();
  }
  if(!req.headers.api_key) return next(boom.badRequest('API key is required!'));
  if(req.headers.api_key !== config.API_KEY) return next(boom.badRequest('API key incorrect!'));
  return next();
}