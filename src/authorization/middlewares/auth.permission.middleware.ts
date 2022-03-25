import { Req, Res, Next, Resp, Fn } from '../../../types/express';
import config from '../../../config/env.config';
const { permissionLevel, app_name } = config;
import boom from '@hapi/boom';


export function minimumRoleRequired(required_role: number = 0): Fn {
    return (req: Req, res: Res, next: Next): Resp => {
        try {
            if(req.user?.active) {
                const userRole = req.user?.role;
                if (userRole && userRole >= required_role && userRole <= permissionLevel.CampusBoosterAdmin && Object.values(permissionLevel).includes(userRole)) {
                    req.isAdmin = ([ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole)) ? true : false;
                    return next();
                } else {
                    if(!userRole) {
                        return next(boom.forbidden(`You have been banned from ${app_name}.`));
                    } else {
                        return next(boom.badRequest('You cannot perform this action, your access rights are not sufficient.'));
                    }
                }
            } else {
                return next(boom.notAcceptable(`You have received an email at ${req.user?.email} to validate your account.`, {shouldBeActivated : true}));
            }
        } catch (e: any) {
            console.log(`${e}`.error);
            return next(boom.unauthorized('Invalid session!')); 
        }
    }
}

export function onlySameUserOrAdmin(req: Req, res: Res, next: Next): Resp {
    try {
        if(req.user?.active) {
            const userRole = req.user?.role;
            const user_id = req.user?.id;
            if (userRole && [ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole)) {
                req.isAdmin = true;
                return next();
            } else {
                if(req.params && req.params.user_id) {
                    if(userRole && user_id === req.params.user_id) {
                        req.isAdmin = ([ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole)) ? true : false;
                        return next();
                    } else {
                        if(!userRole) {
                            return next(boom.forbidden(`You have been banned from ${app_name}.`));
                        } else {
                            return next(boom.badRequest('You cannot perform this action, your access rights are not sufficient.'));
                        }
                    }
                } else {
                    return next(boom.badRequest('user_id parameter is missing in the request.'));
                }
            }   
        } else {
            return next(boom.notAcceptable(`You have received an email at ${req.user?.email} to validate your account.`, {shouldBeActivated : true}));
        }
    } catch (e: any) {
        console.log(`${e}`.error);
        return next(boom.unauthorized('Invalid session!'));
    }
}

export function onlySameUserOrSuperAdmin(req: Req, res: Res, next: Next): Resp {
    try {
        if(req.user?.active) {
            const userRole = req.user?.role;
            const user_id = req.user?.id;
            if (permissionLevel.CampusBoosterAdmin === userRole) {
                req.isAdmin = true;
                return next();
            } else {
                if(req.params && req.params.user_id) {
                    if(user_id === req.params.user_id) {
                        req.isAdmin = (permissionLevel.CampusBoosterAdmin === userRole) ? true : false;
                        return next();
                    } else {
                        if(!userRole) {
                            return next(boom.forbidden(`You have been banned from ${app_name}.`));
                        } else {
                            return next(boom.badRequest('You cannot perform this action, your access rights are not sufficient.'));
                        }
                    }
                } else {
                    return next(boom.badRequest('user_id parameter is missing in the request.'));
                }
            }
        } else {
            return next(boom.notAcceptable(`You have received an email at ${req.user?.email} to validate your account.`, {shouldBeActivated : true}));
        }
    } catch (e: any) {
        console.log(`${e}`.error);
        return next(boom.unauthorized('Invalid session!'));
    }
}

export function onlySuperAdmin(req: Req, res: Res, next: Next): Resp {
    try {
        if(req.user?.active) {
            const userRole = req.user?.role;
            if (userRole === permissionLevel.CampusBoosterAdmin) {
                req.isAdmin = true;
                return next();
            } else {
                if(!userRole) {
                    return next(boom.forbidden(`You have been banned from ${config.app_name}.`));
                } else {
                    return next(boom.badRequest('You cannot perform this action, your access rights are not sufficient.'));
                }
            }
        } else {
            return next(boom.notAcceptable(`You have received an email at ${req.user?.email} to validate your account.`, {shouldBeActivated : true}));
        }
    } catch (e: any) {
        console.log(`${e}`.error);
        return next(boom.unauthorized('Invalid session!'));
    }
}

export function iMustBe(roles: number | number[]): Fn {
    return (req: Req, res: Res, next: Next): Resp => {
        try {
            if(req.user?.active) {
                const userRole = req.user?.role;
                if (userRole && Array.isArray(roles) ? roles.includes(userRole) : userRole === roles) {
                    req.isAdmin = ([ permissionLevel.CampusManager, permissionLevel.CampusBoosterAdmin ].includes(userRole!)) ? true : false;
                    return next();
                } else {
                    if(!userRole) {
                        return next(boom.forbidden(`You have been banned from ${app_name}.`));
                    } else {
                        return next(boom.badRequest('You cannot perform this action, your access rights are not sufficient.'));
                    }
                }    
            } else {
                return next(boom.notAcceptable(`You have received an email at ${req.user?.email} to validate your account.`, {shouldBeActivated : true}));
            }
        } catch (e: any) {
            console.log(`${e}`.error);
            return next(boom.unauthorized('Invalid session!')); 
        }
    }
}