import { Req, Res, Next, Resp } from '../../../types/express';
import * as UserService from '../service/user.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';
import AzureService from '../../../services/azure';
import MailerService from '../../../services/mailing';
import * as UserHasClassroomService from '../../user_has_classrooms/service/user-hasclassroom.service';
import config from '../../../config/env.config';
import generatePassword from 'generate-password';

const {
    app_domain
} = config;
const Mailer = new MailerService();
const Azure = new AzureService();
Azure.OAuth();

export function generateNewPassword(length: number): string {
    // Very rarely, the generator doesn't put a number in the password
    // But Azure requires at least one number or symbol in the password
    let randomPass = '';
    while (!randomPass.match(/\w*\d{1,}\w*/) || !randomPass.match(/[!@#$%^&*()+_\-=}{\[\]|:;"\/?.><,`~]/)) {
        randomPass = generatePassword.generate({length, numbers: true, symbols: true});
    }
    return randomPass;
}

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

        const email = `${req.body.email.split('@')[0]}@${app_domain}`;
        const password = generateNewPassword(16);

        let azureUser = await Azure.getUser(email);
        let isNew = !azureUser;

        if(!azureUser) {
            // CREATE AZURE USER
            azureUser = await Azure.createUser({
                accountEnabled: true,
                surname: req.body.lastName,
                givenName: req.body.firstName,
                displayName: `${req.body.firstName} ${req.body.lastName}`,
                mailNickname: email.split('@')[0],
                userPrincipalName: email,
                passwordProfile: {
                    password,
                    forceChangePasswordNextSignIn: true
                },
            });
            // SEND PASSWORD TO PERSONAL EMAIL
            if (!(await Mailer.custom(
                req.headers.lang === "fr" ? "send-password-fr" : "send-password-en", 
                {
                    to: req.body.personalEmail,
                    username: `${req.body.firstName} ${req.body.lastName}`,
                    password,
                    email
                }
            ))) {
                return next(boom.badRequest('smtp_error', req.body.personalEmail));
            }
        }
        if (azureUser) {
            const user = await UserService.create(
                {
                    azureId: azureUser.id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: azureUser.userPrincipalName,
                    birthday: req.body.birthday,
                    campusId: req.body.campusId,
                    avatarKey: req.body.avatarKey ?? null,
                    role: req.body.role,
                    active: false,
                    banned: false,
                    personalEmail: req.body.personalEmail
                }
            );
            return res.status(201).json({ 
                user: await UserService.findById(user.id, {}, ["withClassrooms" ,"defaultScope"]), isNew 
            });
        } else {
            return next(boom.badRequest('user_creation'));
        }
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        await Azure.deleteUser(req.body.email);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function update(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        const user = await UserService.findById(req.params.user_id);
        const {firstName, lastName, email, personalEmail} = req.body;

        if(req.file) {
            req.body.avatarKey = (req.file as any).key;
            if(user?.avatarKey) await s3.remove(user.avatarKey);
        } else {
            if(user?.avatarKey && !req.body.avatarKey) {
                await s3.remove(user.avatarKey);
                req.body.avatarKey = null;
            }
        }

        if (user && (user.firstName !== firstName || user.lastName !== lastName || user.email !== email || user.personalEmail !== personalEmail)) {
            let newPassword;
            let newPasswordField = {};

            if (!user.active && user.personalEmail !== personalEmail) {
                newPassword = generateNewPassword(16);

                newPasswordField = {
                    passwordProfile: {
                        password: newPassword,
                        forceChangePasswordNextSignIn: true
                    }
                }
            }

            await Azure.updateUser(user.email ?? '', {
                surname: lastName,
                givenName: firstName,
                displayName: (firstName && lastName) ? `${firstName} ${lastName}` : undefined,
                mailNickname: email.split('@')[0],
                userPrincipalName: email,
                ...newPasswordField
            });

            // SEND NEW PASSWORD TO NEW PERSONAL EMAIL
            if (newPassword) {
                if (!(await Mailer.custom(
                    req.headers.lang === "fr" ? "send-password-fr" : "send-password-en", 
                    {
                        to: req.body.personalEmail,
                        username: `${req.body.firstName} ${req.body.lastName}`,
                        password: newPassword,
                        email
                    }
                ))) {
                    return next(boom.badRequest('smtp_error', req.body.personalEmail));
                }
            }
        }

        return res.status(203).json(
            await UserService.update(user?.id, req.body, ["withClassrooms", "defaultScope"])
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function activate(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
      return res.status(203).json(
          await UserService.update(req.params.user_id, {active: true})
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

        if (user?.email) await Azure.deleteUser(user?.email);

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