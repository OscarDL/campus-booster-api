import { Model, Optional } from "sequelize";
import { UserModel } from "./../../users/model/user.interface";
import UserHasClassroomScope from './user-hasclassroom.scope';
import { ClassroomModel } from './../../classrooms/model/classroom.interface';
export interface UserHasClassroomAttributes {
  readonly id: number;
	active?: boolean;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	classroomId: number;
	userId: number;
	User?: UserModel;
	Classroom?: ClassroomModel;
};
export interface UserHasClassroomCreationAttributes extends Optional<UserHasClassroomAttributes, 'id'> {}
export interface UserHasClassroomModel extends Model<UserHasClassroomAttributes, UserHasClassroomCreationAttributes>, Partial<UserHasClassroomAttributes> {
  dataValues?: UserHasClassroomAttributes;
};
export type UserHasClassroomScopesAttributes = keyof ReturnType<typeof UserHasClassroomScope>;
export const UserHasClassroomProtectedFields = [];