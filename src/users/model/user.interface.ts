import { Model, Optional } from "sequelize";
import UserScope from './user.scope';
import config from '../../../config/env.config';
import { CampusModel } from './../../campus/model/campus.interface';
import Speciality from './../../specialities/model/speciality.model';
import { ClasseModel } from "./../../classes/model/classe.interface";
import { FeedbackModel } from './../../feedbacks/model/feedback.interface';
import { TeacherModel } from './../../teachers/model/teacher.interface';
const { permissionLevel } = config;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface UserAttributes {
	readonly id?: number;
	azureId?: string;
	firstName: string;
	lastName: string;
	birthday: Date;
	email: string;
	active?: boolean;
	validated?: boolean;
	role?: typeof permissionLevel[keyof typeof permissionLevel];
	readonly created_at?: Date;
	readonly updated_at?: Date;
	campusId: number;
	Campus?: CampusModel;
	specialityId?: number;
	Speciality?: Speciality;
	classId: number;
	Class?: ClasseModel;
	Feedbacks?: FeedbackModel[];
	Teachers?: TeacherModel[];
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, Partial<UserAttributes> {
  dataValues?: UserAttributes;
};

export type UserScopesAttributes = keyof ReturnType<typeof UserScope>;
export const UserProtectedFields = [];