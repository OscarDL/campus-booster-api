import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as AttendanceController from './controller/attendance.controller';
import * as AttendanceMiddleware from './middleware/attendance.middleware';
import * as PlanningMiddleware from '../plannings/middleware/planning.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

import s3 from '../../services/aws/s3';
const upload = s3.upload("proof of absence");
const uploadMany = upload.array("files", 5);

const routePrefix = config.route_prefix + '/attendances';

export default (app: App): void => {
    // GET ALL ATTENDANCES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		AttendanceController.getAll
    ]);
    // GET ATTENDANCE BY ID
    app.get(`${routePrefix}/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.getById
    ]);
    // CREATE A NEW ATTENDANCE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
        uploadMany,
        RequestMiddleware.bodyParameterHoped('reason', 'string'),
        RequestMiddleware.bodyParameterHoped('missing', 'boolean'),
        RequestMiddleware.bodyParametersNeeded('planningId', "integer"),
        PlanningMiddleware.planningExistAsBody('planningId'),
		AttendanceController.create
    ]);
    // UPDATE ATTENDANCE
    app.patch(`${routePrefix}/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        uploadMany,
        RequestMiddleware.bodyParametersNeeded('fileKeys', "array"),
        RequestMiddleware.bodyParameterHoped('planningId', "integer"),
        PlanningMiddleware.planningExistAsBody('planningId'),
        AttendanceController.update
    ]);
    // DELETE ATTENDANCE
    app.delete(`${routePrefix}/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.rolesAllowed([ Student ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.remove
    ]);
}