import { Req, Res, Next, Resp, ReqJWT } from '../../../types/express';
import config from '../../../config/env.config';
import jwt, { VerifyOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import boom from '@hapi/boom';
import * as UserService from '../../users/service/user.service';
import { ExpressErrorHandler } from '../../../services/express';

function sendTokenExpired(res: Res) {
  return res.status(401).send('refresh_token');
}

export async function validRefreshToken(req: Req, res: Res, next: Next): Promise<Resp> {
  try { 
    const b = Buffer.from(req.body.refreshToken, 'base64');
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

    return next(boom.badRequest("invalid_token"));
  } catch (err) {
    return await ExpressErrorHandler(err)(req, res, next); 
  }
};

export async function JWTNeeded(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(boom.unauthorized('missing_token'));
    }

    req.jwt = jwt.verify(
      accessToken,
      config.jwtSecret, 
      config.jwtOptions as VerifyOptions
    ) as ReqJWT;
    req.user = await UserService.findById(req.jwt.id, {}, 'all');

    return (req.user) ? next() : sendTokenExpired(res);
  } catch (err: any) {
    console.log(`${err}`.red.bold);
    return sendTokenExpired(res);
  }
};

export async function ExpireJWTNeeded(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return next(boom.unauthorized('missing_token'));
    }
    req.jwt = jwt.decode(
      accessToken
    ) as ReqJWT;
    req.user = await UserService.findById(req.jwt.id, {}, 'all');

    return (req.user) ? next() : sendTokenExpired(res);
  } catch (err: any) {
    console.log(`${err}`.red.bold);
    return sendTokenExpired(res);
  }
};