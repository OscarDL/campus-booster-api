import { Req, Res, Next, Resp } from '../../../types/express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../../../config/env.config';
import { ExpressErrorHandler } from '../../../services/express';

export async function login(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
      req.body = {
        id: req.user?.id
      };
      const refreshId = req.user?.id + config.jwtSecret;
      const salt = crypto.randomBytes(16).toString('base64'); 
      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64'); 
      req.body.refreshKey = salt;
      return res.status(201).json(
        { 
          accessToken: jwt.sign(
            req.body,
            config.jwtSecret, 
            config.jwtOptions
          ), 
          refreshToken: Buffer.from(hash).toString('base64'), 
          user : req.user
        }
      );
  } catch (err: any) {
      return await ExpressErrorHandler(err)(req, res, next);
  }
};

export async function refreshToken(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
      res.status(201).json(
          { 
            accessToken: jwt.sign(
              req.body,
              config.jwtSecret, 
              config.jwtOptions
            ) 
          }
      );
  } catch (err: any) {
      return await ExpressErrorHandler(err)(req, res, next);
  }
};
