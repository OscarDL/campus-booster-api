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

export default (app: App): void => {
    // GET ALL ATTENDANCES
    app.get('/attendances', [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		AttendanceController.getAll
    ]);
    // GET ATTENDANCE BY ID
    app.get(`/attendance/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.getById
    ]);
    // CREATE A NEW ATTENDANCE
    app.post('/attendance', [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		AttendanceController.create
    ]);
    // UPDATE ATTENDANCE
    app.patch(`/attendance/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.update
    ]);
    // DELETE ATTENDANCE
    app.delete(`/attendance/:attendance_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('attendance_id', 'integer'),
        AttendanceMiddleware.attendanceExistAsParam("attendance_id"),
        AttendanceController.remove
    ]);
}