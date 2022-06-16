import { Req, Res, Next, Resp } from '../../../types/express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../../../config/env.config';
import boom from '@hapi/boom';
import { ExpressErrorHandler } from '../../../services/express';
import AzureService from '../../../services/azure/lib/azure.service';
const {
  permissionLevel: roles
} = config;

const Azure = new AzureService();
Azure.OAuth();

const allowedUsersWithoutCampus = (role: string) => (
  ![roles.Student, roles.Assistant, roles.CampusManager].includes(role)
);

export async function login(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
      req.body = {
        id: req.user?.id
      };
      if (!req.user || req.user.banned) return next(boom.forbidden('banned'));
      if (!allowedUsersWithoutCampus(req.user.role ?? '') && !req.user.campusId) {
        return next(boom.forbidden('no_campus_assigned'));
      }

      const refreshId = req.user?.id + config.jwtSecret;
      const salt = crypto.randomBytes(16).toString('base64'); 

      const hash = crypto
        .createHmac('sha512', salt)
        .update(refreshId)
        .digest('base64'); 
      req.body.refreshKey = salt;

      const accessToken = jwt.sign(
        req.body,
        config.jwtSecret,
        config.jwtOptions
      );

      return res.cookie(
        'accessToken',
        accessToken,
        {
          sameSite: 'none',
          httpOnly: true,
          secure: true
        }).status(200).json(
        {
          user : req.user,
          refreshToken: Buffer.from(hash).toString('base64')
        }
      );
  } catch (err: any) {
      return await ExpressErrorHandler(err)(req, res, next);
  }
};

export async function logout(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
      return res.clearCookie('accessToken').status(200).json();
  } catch (err: any) {
      return await ExpressErrorHandler(err)(req, res, next);
  }
};

export async function refreshToken(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
    return res.cookie(
      'accessToken', 
      jwt.sign(
        req.body,
        config.jwtSecret, 
        config.jwtOptions
      ),
      {
<<<<<<< HEAD
        ...(config.env === 'production' ? { domain } : {}),
        sameSite: 'none',
        httpOnly: true,
        secure: true,
        path: '/',
=======
        sameSite: 'none',
        httpOnly: true,
        secure: true
>>>>>>> 31ae2626ab6c2856473f55999dd8bec8f13b7f05
      }
    ).sendStatus(200);
  } catch (err: any) {
      return await ExpressErrorHandler(err)(req, res, next);
  }
};
