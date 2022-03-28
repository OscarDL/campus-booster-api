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
    if(!user) return next(boom.badRequest(`Access denied to Azure AD.`));
    const { userPrincipalName } = user;
    req.user = await UserService.findOne(
      {
        where: {
          email: userPrincipalName,
          active: true
        }
      },
      'all'
    );

    if(!req.user) return next(boom.badRequest(`You hasn't access to Campus booster, please contact administrator.`));
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

    if (!validAzureId) return next(boom.badRequest(`Invalid hash please try again later.`));

    req.user.azureId = undefined;
    next();
  } catch (err) {
    return await ExpressErrorHandler(err)(req, res, next); 
  }
};