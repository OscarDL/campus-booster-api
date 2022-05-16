import { Req, Res, Next, Resp } from '../../../types/express';
import * as UserService from '../service/user.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';
import AzureService from '../../../services/azure';
import crypto from "crypto";
import MailerService from '../../../services/mailing';
const Mailer = new MailerService();
const Azure = new AzureService();
Azure.OAuth();

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await UserService.findById(
                req.params.user_id
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getAll(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await UserService.findAll(
                {
                    limit: req.query?.limit
                },
                "withClassrooms"
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        if(req.file) {
            req.body.avatarKey = (req.file as any).key;
        }
        let userAzure = await Azure.getUser(req.body.email);
        let isNew = !userAzure;
        if(!userAzure) {
            if(!req.body.personalEmail) {
                return next(boom.badRequest('personal_email_required'));
            }
            const randomPass = crypto.randomBytes(12).toString('hex');
            // SEND PWD TO PERSONAL EMAIL 
            if(await Mailer.custom("validate-account", {
                email: req.body.personalEmail,
                password: randomPass,
                username: `${req.body.firstName} ${req.body.lastName}`
            })) {
                // CREATE AZURE USER
                userAzure = await Azure.createUser({
                    accountEnabled: true,
                    displayName: `${req.body.firstName} ${req.body.lastName}`,
                    mailNickname: `${req.body.firstName.toLocaleLowerCase()}.${req.body.lastName.toLocaleLowerCase()}`,
                    passwordProfile: {
                        password: randomPass,
                        forceChangePasswordNextSignIn: true
                    },
                    userPrincipalName: req.body.email,
                });
            } else {
                return next(boom.badRequest('smtp_error', req.body.personalEmail));
            }
        }
        if(userAzure) {
            const user = await UserService.create(
                {
                    azureId: userAzure.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: userAzure.userPrincipalName,
                    birthday: req.body.birthday,
                    campusId: req.body.campusId,
                    avatarKey: req.body.avatarKey
                }
            );
            return res.status(201).json({ user, isNew });
        } else {
            return next(boom.badRequest('user_creation'));
        }
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const user = await UserService.findById(req.params.user_id);
        if(req.file) {
            req.body.avatarKey = (req.file as any).key;
            if(user?.avatarKey) await s3.remove(user.avatarKey);
        } else {
            if(user?.avatarKey && !req.body.avatarKey) {
                await s3.remove(user.avatarKey);
                req.body.avatarKey = null;
            }
        }
        return res.status(203).json(
            await UserService.update(
                user?.id, 
                req.body
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function remove(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const user = await UserService.findById(req.params.user_id);
        if(user?.avatarKey) {
            await s3.remove(user.avatarKey);
        }
        return res.status(204).json(
            await UserService.remove(
                {
                    where: {
                        id: user?.id
                    }
                }
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}