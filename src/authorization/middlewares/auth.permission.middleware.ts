import { Req, Res, Next, Resp, Fn } from '../../../types/express';
import config from '../../../config/env.config';
const { permissionLevel: roles } = config;
import boom from '@hapi/boom';
import { findById } from '../../users/service/user.service';
import { UserModel } from '../../users/model/user.interface';

type Roles = Array<typeof roles[keyof typeof roles]>;

export const ADMIN_ROLES = [roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin];
export const SUPER_ADMIN_ROLES = [roles.CampusManager, roles.CampusBoosterAdmin];

export function rolesAllowed(roles: Roles): Fn {
    return (req: Req, res: Res, next: Next): Resp => {
        try {
            if(!req.user) throw new Error('Login required.');
            if(req.user.active) {
                const userRole = req.user?.role;
                if (userRole && roles.includes(userRole)) {
                    req.isAdmin = (ADMIN_ROLES.includes(userRole)) ? true : false;
                    return next();
                } else {
                    return next(boom.badRequest('missing_access_rights'));
                }
            } else {
                return next(boom.notAcceptable('activate_acount'));
            }
        } catch (e: any) {
            console.log(`${e}`.red.bold);
            return next(boom.unauthorized('invalid_session')); 
        }
    }
}

export function userHasHigherRole(
    compareSameRole: boolean,
    loggedInUserRole: UserModel['role'],
    requestedUserRole?: UserModel['role']
): boolean {
    const {
        CampusBoosterAdmin: cba, CampusManager: cm, Assistant: a,
        Company: c, FullProfessor: fp, Professor: p, Student: s
    } = roles;

    if (!requestedUserRole) requestedUserRole = '';

    switch (loggedInUserRole) {
        case cba: return false;
        case cm: return [cba].concat(compareSameRole ? cm : []).includes(requestedUserRole);
        case a: return [cba, cm].concat(compareSameRole ? a : []).includes(requestedUserRole);
        // company is not superior to professors
        case c: return [cba, cm, a].concat(compareSameRole ? c : []).includes(requestedUserRole);
        case fp: return [cba, cm, a].concat(compareSameRole ? fp : []).includes(requestedUserRole);
        case p: return [cba, cm, a, fp].concat(compareSameRole ? p : []).includes(requestedUserRole);
        case s: return [cba, cm, a, c, fp, p].concat(compareSameRole ? s : []).includes(requestedUserRole);
    };

    return true;
}

export function userIsDifferentAndHasSameRole(loggedInUser: UserModel, requestedUser: UserModel): boolean {
    if (loggedInUser.role === roles.CampusBoosterAdmin) return false;
    return requestedUser.id !== loggedInUser.id && requestedUser.role === loggedInUser.role;
}

export function onlySameUserOrAdmin(req: Req, res: Res, next: Next): Resp {
    try {
        if(!req.user) throw new Error('Login required.');
        if(req.user?.active) {
            const userRole = req.user?.role;
            const user_id = req.user?.id;
            if (userRole && ADMIN_ROLES.includes(userRole)) {
                req.isAdmin = true;
                return next();
            } else {
                if(req.params && req.params.user_id) {
                    if(userRole && user_id === Number(req.params.user_id)) {
                        req.isAdmin = (ADMIN_ROLES.includes(userRole)) ? true : false;
                        return next();
                    } else {
                        if(!userRole) {
                            return next(boom.forbidden(`banned`));
                        } else {
                            return next(boom.badRequest('missing_access_rights'));
                        }
                    }
                } else {
                    return next(boom.badRequest('params_missing_user_id'));
                }
            }   
        } else {
            return next(boom.notAcceptable('activate_acount'));
        }
    } catch (e: any) {
        console.log(`${e}`.red.bold);
        return next(boom.unauthorized('invalid_session'));
    }
}

export function onlySameUserOrSuperAdmin(req: Req, res: Res, next: Next): Resp {
    try {
        if(!req.user) throw new Error('Login required.');
        if(req.user?.active) {
            const userRole = req.user?.role;
            const user_id = req.user?.id;
            if (userRole && SUPER_ADMIN_ROLES.includes(userRole)) {
                req.isAdmin = true;
                return next();
            } else {
                if(req.params && req.params.user_id) {
                    if(user_id === Number(req.params.user_id)) {
                        req.isAdmin = (userRole && SUPER_ADMIN_ROLES.includes(userRole)) ? true : false;
                        return next();
                    } else {
                        if(!userRole) {
                            return next(boom.forbidden(`banned`));
                        } else {
                            return next(boom.badRequest('missing_access_rights'));
                        }
                    }
                } else {
                    return next(boom.badRequest('params_missing_user_id'));
                }
            }
        } else {
            return next(boom.notAcceptable('activate_acount'));
        }
    } catch (e: any) {
        console.log(`${e}`.red.bold);
        return next(boom.unauthorized('invalid_session'));
    }
}

export function onlySuperAdmin(req: Req, res: Res, next: Next): Resp {
    try {
        if(!req.user) throw new Error('Login required.');
        if(req.user?.active) {
            const userRole = req.user?.role;
            if (userRole === roles.CampusBoosterAdmin) {
                req.isAdmin = true;
                return next();
            } else {
                if(!userRole) {
                    return next(boom.forbidden(`banned`));
                } else {
                    return next(boom.badRequest('missing_access_rights'));
                }
            }
        } else {
            return next(boom.notAcceptable('activate_acount'));
        }
    } catch (e: any) {
        console.log(`${e}`.red.bold);
        return next(boom.unauthorized('invalid_session'));
    }
}