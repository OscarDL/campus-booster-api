import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as AttendanceController from './controller/attendance.controller';
import * as AttendanceMiddleware from './middleware/attendance.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/attendances';

export default (app: App): void => {
    // GET ALL ATTENDANCES
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		AttendanceController.getAll
    ]);
    // GET ATTENDANCE BY ID
    app.get(`${routePrefix}/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.getById
    ]);
    // CREATE A NEW ATTENDANCE
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		AttendanceController.create
    ]);
    // UPDATE ATTENDANCE
    app.patch(`${routePrefix}/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.update
    ]);
    // DELETE ATTENDANCE
    app.delete(`${routePrefix}/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.remove
    ]);
}