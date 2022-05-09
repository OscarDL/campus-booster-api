import { Model, Optional } from "sequelize";
import UserScope from './user.scope';
import config from '../../../config/env.config';
import { CampusModel } from './../../campus/model/campus.interface';
import { ClassroomModel } from "../../classrooms/model/classroom.interface";
import { FeedbackModel } from './../../feedbacks/model/feedback.interface';
import { TeacherModel } from './../../teachers/model/teacher.interface';
import { AttendanceModel } from './../../attendances/model/attendance.interface';
import { GradeModel } from './../../grades/model/grade.interface';
import { BalanceModel } from './../../balances/model/balance.interface';
import { UserHasClassroomModel } from './../../user_has_classrooms/model/user-hasclassroom.interface';
const { permissionLevel } = config;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface UserAttributes {
	readonly id?: number;
	azureId?: string;
  avatar?: string | null;
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
	UserHasClassrooms?: UserHasClassroomModel[];
	Feedbacks?: FeedbackModel[];
	Teachers?: TeacherModel[];
	Attendances?: AttendanceModel[];
	Grades?: GradeModel[];
	Balances?: BalanceModel[];
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, Partial<UserAttributes> {
  dataValues?: UserAttributes;
};

export type UserScopesAttributes = keyof ReturnType<typeof UserScope>;
export const UserProtectedFields = [];