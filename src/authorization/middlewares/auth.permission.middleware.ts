import { Req, Res, Next, Resp, Fn } from '../../../types/express';
import config from '../../../config/env.config';
const { permissionLevel: roles } = config;
import boom from '@hapi/boom';

type Role = typeof roles[keyof typeof roles];
type Roles = Array<typeof roles[keyof typeof roles]>;

export const ADMIN_ROLES = [roles.Assistant, roles.CampusManager, roles.CampusBoosterAdmin];
export const SUPER_ADMIN_ROLES = [roles.CampusManager, roles.CampusBoosterAdmin];

export function rolesAllowed(roles: Roles): Fn {
    return (req: Req, res: Res, next: Next): Resp => {
        try {
            if(!req.user) throw new Error('Login required.');
            if(req.user?.active) {
                const userRole = req.user?.role;
                if (userRole && roles.includes(userRole)) {
                    if(!req.user?.active) {
                        return next(boom.forbidden(`banned`));
                    }
                    req.isAdmin = (ADMIN_ROLES.includes(userRole)) ? true : false;
                    return next();
                } else {
                    if(!req.user?.active) {
                        return next(boom.forbidden(`banned`));
                    } else {
                        return next(boom.badRequest('missing_access_rights'));
                    }
                }
            } else {
                return next(boom.notAcceptable('validate_account'));
            }
        } catch (e: any) {
            console.log(`${e}`.red.bold);
            return next(boom.unauthorized('invalid_session')); 
        }
    }
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
            return next(boom.notAcceptable('validate_account'));
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
            return next(boom.notAcceptable('validate_account'));
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
            return next(boom.notAcceptable('validate_account'));
        }
    } catch (e: any) {
        console.log(`${e}`.red.bold);
        return next(boom.unauthorized('invalid_session'));
    }
}