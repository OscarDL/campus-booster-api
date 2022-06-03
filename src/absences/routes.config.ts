import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as AbsenceController from './controller/absence.controller';
import * as AbsenceMiddleware from './middleware/absence.middleware';
import * as PlanningMiddleware from '../plannings/middleware/planning.middleware';
import * as UserMiddleware from '../users/middleware/user.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

import s3 from '../../services/aws/s3';
const upload = s3.uploadDocument("absences");
const uploadMany = upload.array("files", 5);

const routePrefix = config.route_prefix + '/absences';

export default (app: App): void => {
    // GET ALL ABSENCES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		    PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
		    AbsenceController.getAll
    ]);
    // GET ABSENCE BY ID
    app.get(`${routePrefix}/:absence_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES), 
        RequestMiddleware.paramParametersNeeded('absence_id', 'integer'),
        AbsenceMiddleware.absenceExistAsParam("absence_id"),
        AbsenceController.getById
    ]);
    // GET ABSENCE BY USER
    app.get(`${routePrefix}/user/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
        RequestMiddleware.queryParameterHoped('offset', 'float'),
        RequestMiddleware.queryParameterHoped('limit', 'integer'),
        RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        AbsenceController.getByUser
    ]);
    // CREATE A NEW ABSENCE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		    PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES.concat(Student)),
        uploadMany,
        // Upload necessary data in JSON format
        RequestMiddleware.bodyParametersNeeded('data', 'string'),
        AbsenceMiddleware.formatBodyParameters,
        // Form-data doesn't support uploading types other than Blob or string, so we have to parse them before
        RequestMiddleware.bodyParametersNeeded(['late', 'missing'], 'boolean'),
        RequestMiddleware.bodyParametersNeeded(['userId', 'planningId'], 'integer'),
        RequestMiddleware.bodyParametersNeeded(['reason'], 'string'),
        PlanningMiddleware.planningExistAsBody('planningId'),
        UserMiddleware.userExistAsBody('userId'),
        AbsenceController.create
    ]);
    // UPDATE ABSENCE
    app.patch(`${routePrefix}/:absence_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES.concat(Student)), 
        RequestMiddleware.paramParametersNeeded('absence_id', 'integer'),
        AbsenceMiddleware.absenceExistAsParam("absence_id"),
        uploadMany,
        RequestMiddleware.bodyParametersNeeded('fileKeys', "array"),
        RequestMiddleware.bodyParameterHoped('planningId', "integer"),
        PlanningMiddleware.planningExistAsBody('planningId'),
        AbsenceController.update
    ]);
    // DELETE ABSENCE
    app.delete(`${routePrefix}/:absence_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES.concat(Student)), 
        RequestMiddleware.paramParametersNeeded('absence_id', 'integer'),
        AbsenceMiddleware.absenceExistAsParam("absence_id"),
        AbsenceController.remove
    ]);
}