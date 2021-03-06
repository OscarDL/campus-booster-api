import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as PermissionMiddleware from '../authorization/middlewares/auth.permission.middleware';
import * as UserController from './controller/user.controller';
import * as UserMiddleware from './middleware/user.middleware';
import * as CampusMiddleware from '../campus/middleware/campus.middleware';
import * as ClassroomMiddleware from '../classrooms/middleware/classroom.middleware';

import config from '../../config/env.config';
const { 
	customRegex: { regInt },
    permissionLevel: roles
} = config;

import s3 from '../../services/aws/s3';
import { genders } from './model/user.interface';
const upload = s3.uploadImage("users");
const singleUpload = upload.single("file");

const routePrefix = config.route_prefix + '/users';

export default (app: App): void => {
    // GET ALL USERS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)),
        UserController.getAll
    ]);
    // GET USERS IN ANY CLASSROOM OF TEACHER
    app.get(routePrefix + `/teacher/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.onlySameUserOrAdmin,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserController.getUsersForTeacher
    ]);
    // GET USER BY ID
    app.get(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(Object.values(roles)),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserMiddleware.iamAdminOrItsaStudent,
        UserController.getById
    ]);
    // CREATE A NEW USER
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        singleUpload,
        RequestMiddleware.bodyParametersNeeded(['firstName', 'lastName'], 'string'),
        RequestMiddleware.bodyParametersNeeded(['email', 'personalEmail'], 'email'),
        RequestMiddleware.bodyParametersNeeded('role', 'enum', Object.values(roles)),
        RequestMiddleware.bodyParameterHoped('promotion', 'integer'),
        RequestMiddleware.bodyParameterHoped('birthday', 'string'),
        RequestMiddleware.bodyParameterHoped('address', 'string'),
        RequestMiddleware.bodyParameterHoped('gender', 'enum', [ ...genders ]),
        RequestMiddleware.bodyParameterHoped('campusId', 'integer'),
        CampusMiddleware.campusExistAsBody('campusId'),
        UserMiddleware.requestedUserHasLowerRole,
        UserMiddleware.verifyMandatoryFields,
        UserMiddleware.emailIsNotTaken,
		UserController.create
    ]);
    // ADD USER TO CLASSROOMS
    app.post(routePrefix + `/classrooms/add/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        RequestMiddleware.bodyParametersNeeded('classrooms', 'array'),
        ClassroomMiddleware.classroomCanBeLinkedToUser,
        UserController.addToClassrooms
    ]);
    // REMOVE USER FROM CLASSROOMS
    app.post(routePrefix + `/classrooms/remove/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam('user_id'),
        RequestMiddleware.bodyParametersNeeded('classrooms', 'array'),
        ClassroomMiddleware.classroomCanBeUnLinkedFromUser,
        UserMiddleware.campusManagerIsNotTaken,
        UserController.removeFromClassrooms
    ]);
    // UPDATE USER
    app.patch(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        UserMiddleware.requestedUserHasLowerRole,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        singleUpload,
        RequestMiddleware.bodyParameterHoped('campusId', 'integer'),
        CampusMiddleware.campusExistAsBody('campusId'),
        UserMiddleware.campusManagerIsNotTaken,
        UserMiddleware.verifyMandatoryFields,
        UserMiddleware.emailIsNotTaken,
        UserController.update
    ]);
    // RESET USER PASSWORD
    app.patch(routePrefix + `/resetpassword/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        RequestMiddleware.bodyParametersNeeded('personalEmail', 'email'),
        UserController.resetUserPassword
    ]);
    // ACTIVATE USER ACCOUNT
    app.patch(routePrefix + `/activate/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        UserMiddleware.userExistAsParam("user_id"),
        UserController.activate
    ]);
    // DELETE USER FROM AZURE
    app.delete(routePrefix + `/azure/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        UserMiddleware.requestedUserHasLowerRole,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserMiddleware.dontDeleteYourself,
        UserController.removeFromAzure
    ]);
    // DELETE USER
    app.delete(routePrefix + `/:user_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
        PermissionMiddleware.rolesAllowed(PermissionMiddleware.ADMIN_ROLES),
        UserMiddleware.requestedUserHasLowerRole,
		RequestMiddleware.paramParametersNeeded('user_id', 'integer'),
        UserMiddleware.userExistAsParam("user_id"),
        UserMiddleware.dontDeleteYourself,
        UserController.remove
    ]);
}