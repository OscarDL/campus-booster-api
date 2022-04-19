import { App } from '../../types/express';
import * as ValidationMiddleware from "../authorization/middlewares/auth.validation.middleware";
import * as PermissionMiddleware from "../authorization/middlewares/auth.permission.middleware";
import * as RequestMiddleware from '../authorization/middlewares/request.validation';
import * as CourseContentController from './controller/course-content.controller';
import * as CourseContentMiddleware from './middleware/course-content.middleware';
import config from '../../config/env.config';
const { 
	permissionLevel: { User }, 
    customRegex: { regInt } 
} = config;

export default (app: App): void => {
    // GET ALL COURSE CONTENTS
    app.get('/coursecontents', [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		CourseContentController.getAll
    ]);
    // GET COURSE CONTENT BY ID
    app.get(`/coursecontent/:coursecontent_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('coursecontent_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("coursecontent_id"),
        CourseContentController.getById
    ]);
    // CREATE A NEW COURSE CONTENT
    app.post('/coursecontent', [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.bodyParametersNeeded(['name','link'], 'string'),
		CourseContentController.create
    ]);
    // UPDATE COURSE CONTENT
    app.patch(`/coursecontent/:coursecontent_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('coursecontent_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("coursecontent_id"),
        CourseContentController.update
    ]);
    // DELETE COURSE CONTENT
    app.delete(`/coursecontent/:coursecontent_id${regInt}`, [
        ValidationMiddleware.validJWTNeeded,
		PermissionMiddleware.iMustBe([ User ]), 
		RequestMiddleware.paramParametersNeeded('coursecontent_id', 'integer'),
        CourseContentMiddleware.coursecontentExistAsParam("coursecontent_id"),
        CourseContentController.remove
    ]);
}