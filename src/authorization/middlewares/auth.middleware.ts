import { Req, Res, Next, Resp } from '../../../types/express';
import { ExpressErrorHandler } from '../../../services/express';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import * as UserService from '../../users/service/user.service';
import AzureService from '../../../services/azure';
const Azure = new AzureService();
Azure.OAuth();

export async function decryptToken(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
    const user = await Azure.getUser(req.body.azureId);
    if(!user) return next(boom.badRequest(`azure_ad_denied`));

    req.user = await UserService.findOne(
      {
        where: {
          email: user.userPrincipalName,
          banned: false
        }
      },
      'all'
    );

    if(!req.user) return next(boom.badRequest('banned'));
    if(!req.user.azureId) {
      req.user = await UserService.update(
        req.user.id,
        {
          azureId: req.body.azureId
        },
        'all'
      );
    }

    const validAzureId = await bcrypt.compare(req.body.azureId, req.user.azureId!);

    if (!validAzureId) return next(boom.badRequest(`params_invalid_hash`));

    req.user.azureId = undefined;
    next();
  } catch (err) {
    return await ExpressErrorHandler(err)(req, res, next); 
  }
};