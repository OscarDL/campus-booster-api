import { Req, Res, Next, Resp } from '../../../types/express';
import { ExpressErrorHandler } from '../../../services/express';
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import * as Userservice from '../../users/service/user.service';
import AzureService from '../../../services/azure';
const Azure = new AzureService();
Azure.OAuth();

export async function decryptToken(req: Req, res: Res, next: Next): Promise<Resp> {
  try {
    const user = await Azure.getUser(req.body.azureId);
    if(!user) return next(boom.badRequest(`Access denied to Azure AD.`));
    const { userPrincipalName } = user;
    req.user = await Userservice.findOne(
      {
        where: {
          email: userPrincipalName,
          active: true
        }
      },
      "all"
    );
    if(!req.user) return next(boom.badRequest(`You hasn't access to Campus booster, please contact administrator.`));  
    if(!req.user.azure_id) {
      req.user = await Userservice.update(
        req.user.id,
        {
          azure_id: req.body.azureId
        },
        'all'
      );
    }
    return(
      await bcrypt.compare(req.body.azureId, req.user.azure_id!)
    ) ? next() : next(boom.badRequest(`Invalid hash please try again later.`));
  } catch (err) {
    return await ExpressErrorHandler(err)(req, res, next); 
  }
};