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
    const user = await Azure.getUser(req.body.email);
    if(!user) return next(boom.badRequest(`Access denied for ${req.body.email}.`));
    const { id } = user;
    if(
      !(await bcrypt.compare(id, req.body.hash))
    ) return next(boom.badRequest(`Invalid hash please try again later.`));
    req.user = await Userservice.findOne(
      {
        where: {
          azure_id: id,
          active: true
        }
      },
      "all"
    );
    return req.user ? next() : next(boom.badRequest(`${req.body.email} hasn't access to Campus booster, please contact administrator.`));  
  } catch (err) {
    return await ExpressErrorHandler(err)(req, res, next); 
  }
};