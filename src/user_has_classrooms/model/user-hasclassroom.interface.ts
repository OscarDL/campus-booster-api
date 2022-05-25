import { UnpackChildAttributes } from './../../../types/sequelize.d';
import { Model, Optional } from "sequelize";
import { UserAttributes, UserModel } from "./../../users/model/user.interface";
import UserHasClassroomScope from './user-hasclassroom.scope';
import { ClassroomModel } from './../../classrooms/model/classroom.interface';
export interface UserHasClassroomAttributes extends
	UnpackChildAttributes<"User", UserAttributes>
{
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