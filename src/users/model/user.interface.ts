import { ContractModel } from './../../contracts/model/contract.interface';
import { ClassroomHasCourseModel } from './../../classroom_has_courses/model/classroomhascourse.interface';
import { Model, Optional } from "sequelize";
import UserScope from './user.scope';
import config from '../../../config/env.config';
import { CampusModel } from './../../campus/model/campus.interface';
import { FeedbackModel } from './../../feedbacks/model/feedback.interface';
import { AbsenceModel } from './../../absences/model/absence.interface';
import { GradeModel } from './../../grades/model/grade.interface';
import { BalanceModel } from './../../balances/model/balance.interface';
import { UserHasClassroomModel } from './../../user_has_classrooms/model/user-hasclassroom.interface';
const { permissionLevel } = config;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export interface UserAttributes {
	readonly id?: number;
	azureId: string;
  avatar?: string | null;
	firstName: string;
	lastName: string;
	birthday: Date;
	email: string;
	personalEmail: string;
	active?: boolean;
	banned?: boolean;
	address?: string;
	gender?: Gender;
	promotion?: number;
  credits?: number | null;
	role?: typeof permissionLevel[keyof typeof permissionLevel];
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	campusId?: number;
	Campus?: CampusModel;
	UserHasClassrooms?: UserHasClassroomModel[];
	Feedbacks?: FeedbackModel[];
	Absences?: AbsenceModel[];
	Grades?: GradeModel[];
	ClassroomHasCourses?: ClassroomHasCourseModel[]; 
	Balances?: BalanceModel[];
	avatarKey?: string | null;
	avatarBase64?: string | null;
	SupervisorContracts?: ContractModel[];
	UserContracts?: ContractModel[];
};
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, Partial<UserAttributes> {
  dataValues?: UserAttributes;
};
export const genders = <const> [ "M", "F" ];
export type Gender = typeof genders[number];
export type UserScopesAttributes = keyof ReturnType<typeof UserScope>;
export const UserProtectedFields: (keyof UserAttributes)[] = [
  "azureId",
  "personalEmail",
  "avatarKey",
  "avatarBase64",
  "active",
  "banned",
  "credits",
  "address"
];
export const UserPublicFields: (keyof UserAttributes)[] = [
  "id",
  "firstName",
  "lastName",
  "email",
  "role"
];