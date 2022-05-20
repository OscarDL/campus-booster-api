import { Req, Res, Next, Resp } from '../../../types/express';
import * as UserService from '../service/user.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';
import AzureService from '../../../services/azure';
import crypto from "crypto";
import MailerService from '../../../services/mailing';
import * as UserHasClassroomService from '../../user_has_classrooms/service/user-hasclassroom.service';
import config from '../../../config/env.config';
const replaceString = require("replace-special-characters");
const {
    app_domaine
} = config;
const Mailer = new MailerService();
const Azure = new AzureService();
Azure.OAuth();

export async function getById(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        return res.status(200).json(
            await UserService.findById(
                req.params.user_id,
                {},
                [
                    "withClassrooms",
                    req.isAdmin ? "defaultScope" : "iamNotAdmin"
                ]
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
                [ 
                    "withClassrooms",
                    req.isAdmin ? "defaultScope" : "iamNotAdmin"
                ]
            )
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function addToClassrooms(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const classrooms = [ ...new Set(req.body.classrooms) ] as number[];
        for (let i = 0; i < classrooms?.length; i++) {
            const id = classrooms[i];
            await UserHasClassroomService.create({
                classroomId: id,
                userId: parseInt(req.params.user_id)
            });
        }
        return res.status(201).json(
            await UserService.findById(req.params.user_id, {}, ["withClassrooms", "defaultScope"])
        );
    } catch (err: any) {
        console.log(err);
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function removeFromClassrooms(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const classrooms = [ ...new Set(req.body.classrooms) ] as number[];
        for (let i = 0; i < classrooms?.length; i++) {
            const id = classrooms[i];
            await UserHasClassroomService.remove({
                where: { 
                    classroomId: id,
                    userId: req.params.user_id
                }
            });
        }
        return res.status(201).json(
            await UserService.findById(req.params.user_id, {}, ["withClassrooms", "defaultScope"])
        );
    } catch (err: any) {
        console.log(err);
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function create(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        if(req.file) {
            req.body.avatarKey = (req.file as any).key;
        }
        const email = `${replaceString(req.body.firstName?.toLocaleLowerCase())}.${replaceString(req.body.lastName?.toLocaleLowerCase())}@${app_domaine}`;
        let userAzure = await Azure.getUser(email);
        let isNew = !userAzure;
        if(!userAzure) {
            const randomPass = `C${crypto.randomBytes(8).toString('hex')}`;
            // SEND PWD TO PERSONAL EMAIL 
            if(await Mailer.custom(
                req.headers.lang === "fr" ? "send-password-fr" : "send-password-en", 
                {
                    to: req.body.personalEmail,
                    password: randomPass,
                    username: `${req.body.firstName} ${req.body.lastName}`,
                    email
                }
            )) {
                // CREATE AZURE USER
                userAzure = await Azure.createUser({
                    accountEnabled: true,
                    displayName: `${req.body.firstName} ${req.body.lastName}`,
                    mailNickname: req.body.email,
                    passwordProfile: {
                        password: randomPass,
                        forceChangePasswordNextSignIn: true
                    },
                    userPrincipalName: email,
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
                    avatarKey: req.body.avatarKey ?? null,
                    role: req.body.role,
                    validated: true,
                    active: true,
                    personalEmail: req.body.personalEmail
                }
            );
            return res.status(201).json({ 
                user: await UserService.findById(user.id, {}, ["withClassrooms" ,"defaultScope"]), 
                isNew 
            });
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