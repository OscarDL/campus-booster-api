import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CourseContentController from './controller/course-content.controller';
import * as CourseContentMiddleware from './middleware/course-content.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { Student }, 
    customRegex: { regInt } 
} = config;

const routePrefix = config.route_prefix + '/coursecontents';

export default (app: App): void => {
    // GET ALL COURSE CONTENTS
    app.get(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		CourseContentController.getAll
    ]);
    // GET COURSE CONTENT BY ID
    app.get(`${routePrefix}/:coursecontent_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('coursecontent_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("coursecontent_id"),
        CourseContentController.getById
    ]);
    // CREATE A NEW COURSE CONTENT
    app.post(routePrefix, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.bodyParametersNeeded(['name','link'], 'string'),
		CourseContentController.create
    ]);
    // UPDATE COURSE CONTENT
    app.patch(`${routePrefix}/:coursecontent_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('coursecontent_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("coursecontent_id"),
        CourseContentController.update
    ]);
    // DELETE COURSE CONTENT
    app.delete(`${routePrefix}/:coursecontent_id${regInt}`, [
        ValidationMiddleware.JWTNeeded,
		PermissionMiddleware.iMustBe([ Student ]), 
		RequestMiddleware.paramParametersNeeded('coursecontent_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("coursecontent_id"),
        CourseContentController.remove
    ]);
}