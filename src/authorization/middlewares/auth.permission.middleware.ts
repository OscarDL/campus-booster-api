import { Req, Res, Next, Resp, Fn } from '../../../types/express';
import config from '../../../config/env.config';
const { permissionLevel } = config;
import boom from '@hapi/boom';

type Role = typeof permissionLevel[keyof typeof permissionLevel];
type Roles = Array<typeof permissionLevel[keyof typeof permissionLevel]>;

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
                    req.isAdmin = ([ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole)) ? true : false;
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
            if (userRole && [ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole)) {
                req.isAdmin = true;
                return next();
            } else {
                if(req.params && req.params.user_id) {
                    if(userRole && user_id === Number(req.params.user_id)) {
                        req.isAdmin = ([ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole)) ? true : false;
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
            if (permissionLevel.CampusBoosterAdmin === userRole) {
                req.isAdmin = true;
                return next();
            } else {
                if(req.params && req.params.user_id) {
                    if(user_id === Number(req.params.user_id)) {
                        req.isAdmin = (permissionLevel.CampusBoosterAdmin === userRole) ? true : false;
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
            if (userRole === permissionLevel.CampusBoosterAdmin) {
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