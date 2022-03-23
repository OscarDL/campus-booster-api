import { Model, Optional } from "sequelize";
import UserScope from './user.scope';
import config from '../../../config/env.config';
const { permissionLevel } = config;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export interface UserAttributes {
	readonly id?: string;
	azure_id: string;
	firstname: string;
	lastname: string;
	birthday: Date;
	email: string;
	firebase_push_token?: string;
	is_validate?: boolean;
	role?: typeof permissionLevel[keyof typeof permissionLevel];
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
};
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, Partial<UserAttributes> {
  dataValues?: UserAttributes;
};
export type UserScopesAttributes = keyof ReturnType<typeof UserScope>;
export const UserProtectedFields = [];