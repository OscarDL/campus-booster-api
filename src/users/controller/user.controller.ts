import { Req, Res, Next, Resp } from '../../../types/express';
import * as UserService from '../service/user.service';
import * as TeacherService from '../../teachers/service/teacher.service';
import boom from '@hapi/boom';
import s3 from '../../../services/aws/s3';
import AzureService from '../../../services/azure';
import MailerService from '../../../services/mailing';
import * as UserHasClassroomService from '../../user_has_classrooms/service/user-hasclassroom.service';
import config from '../../../config/env.config';
import generatePassword from 'generate-password';
import moment from 'moment';

const {
    app_domain,
    permissionLevel: { Student, CampusBoosterAdmin }
} = config;
const Mailer = new MailerService();
const Azure = new AzureService();
Azure.OAuth();

export function generateNewPassword(length: number): string {
    // Very rarely, the generator doesn't put a number in the password
    // But Azure requires at least one number or symbol in the password
    let randomPass = '';
    while (!randomPass.match(/\w*\d{1,}\w*/) || !randomPass.match(/[!@#$%^&*()+_\-=}{\[\]|:;\/?.,`~]/)) {
        randomPass = generatePassword.generate({length, numbers: true, symbols: true, exclude: '<>"'});
    }
    return randomPass;
}

export async function sendPasswordEmail(req: Req, next: Next, email: string, newPassword: string) {
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
            (await UserService.findAll(
                {
                    limit: req.query?.limit
                },
                [ 
                    "withClassrooms",
                    req.isAdmin ? "defaultScope" : "iamNotAdmin"
                ]
            )).filter(user => {
                if (!req.user?.campusId) return true;
                // Also retrieve administrators for assistants & campus managers
                if (req.isAdmin) {
                    return user.campusId === req.user.campusId || user.role === CampusBoosterAdmin;
                }
                return user.campusId === req.user.campusId;
            })
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function getUsersForTeacher(req: Req, res: Res, next: Next): Promise<Resp> {
    try {
        const teachers = await TeacherService.findAll(
            {
                where: {
                    userId: req.params.user_id
                }
            },
            [
                "withClassroom"
            ]
        );
        const classrooms = teachers.map(teacher => teacher.ClassroomHasCourse?.id) ?? [];

        return res.status(200).json(
            (await UserService.findAll(
                {
                    limit: req.query?.limit
                },
                [ 
                    "withClassrooms",
                    req.isAdmin ? "defaultScope" : "iamNotAdmin"
                ]
            )).filter(user => {
              const IDs = user.UserHasClassrooms?.map(u => u.Classroom?.ClassroomHasCourses?.map(c => c?.id))?.flat();
              return IDs?.some(id => classrooms.includes(id));
            })
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
            if(azureUser && !(
                await Azure.grantUserToApplication(
                    azureUser.id,
                    "Campus Booster"
                )
            )) {
                return next(boom.badRequest('grant_error'));
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
                    credits: 0,
                    gender: req.body.gender,
                    promotion: req.body.role === Student ? (req.body.promotion ?? moment().get('year')) : undefined,
                    address: req.body.address,
                    personalEmail: req.body.personalEmail
                }
            );

            if (!isNew && req.body.personalEmail) {
                // Reset password for non-new users
                await Azure.updateUser(user.email!, {
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
            }

            await sendPasswordEmail(req, next, email, password);

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

        if (user && firstName && lastName && email) {
          let newPassword = '';
          let newPasswordField = {};
          
          // Reset password if personal email changed
          if (personalEmail && user.personalEmail !== personalEmail) {
            newPassword = generateNewPassword(16);
            newPasswordField = {
              passwordProfile: {
                password: newPassword,
                forceChangePasswordNextSignIn: true
              }
            };
            
            await sendPasswordEmail(req, next, email, newPassword);
            await UserService.update(user.id, {active: false});
          }

          if (user.firstName !== firstName || user.lastName !== lastName || user.email !== email || user.personalEmail !== personalEmail) {
            await Azure.updateUser(user.email!, {
              surname: lastName,
              givenName: firstName,
              displayName: (firstName && lastName) ? `${firstName} ${lastName}` : undefined,
              mailNickname: email.split('@')[0],
              userPrincipalName: email,
              ...newPasswordField
            });
          }
        }

        if (user && user.credits !== Number(user.credits)) {
            // if user credits are null, it should be turned into an integer (0)
            await UserService.update(user?.id, {credits: 0}, ["withClassrooms", "defaultScope"]);
        }
        if (user && user.role === Student && !user.promotion) {
            req.body.promotion = moment().get('year');
        }

        await UserService.update(
            user?.id,
            {
                ...req.body,
                gender: req.body.gender ?? null,
                campusId: req.body.campusId ?? null
            },
            [
                "withClassrooms",
                "defaultScope"
            ]
        );
        return res.status(203).json(
            await UserService.findById(user?.id, {}, ["withClassrooms", "defaultScope"])
        );
    } catch (err: any) {
        console.log(`${err}`.red.bold);
        return next(err.isBoom ? err : boom.internal(err.name));
    }
}

export async function resetUserPassword(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
      const user = await UserService.findById(req.params.user_id);
      const personalEmail = user?.personalEmail || req.body.personalEmail || '';

      if (!user || !personalEmail) {
          return next(boom.badRequest('user_password_reset'));
      }

      const newPassword = generateNewPassword(16);
      await Azure.updateUser(user.email!, {
          passwordProfile: {
              password: newPassword,
              forceChangePasswordNextSignIn: true 
          }
      });

      req.body.lastName = user.lastName;
      req.body.firstName = user.firstName;
      const sentEmail = await sendPasswordEmail(req, next, user.email!, newPassword);

      return res.status(203).json(sentEmail);
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

export async function removeFromAzure(req: Req, res: Res, next: Next): Promise<Resp>  {
    try {
        // USER SHOULD BE DELETED FROM AZURE BEFORE BEING DELETED IN THE APP DATABASE
        const user = await UserService.findById(req.params.user_id);

        return res.status(204).json(await Azure.deleteUser(user?.email ?? ''));
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