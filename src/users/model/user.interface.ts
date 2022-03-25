import { Model, Optional } from "sequelize";
import UserScope from './user.scope';
import config from '../../../config/env.config';
const { permissionLevel } = config;
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export interface UserAttributes {
	readonly id?: number;
	azure_id?: string;
	first_name: string;
	last_name: string;
	birthday?: Date;
	email: string;
	active?: boolean;
	is_validated?: boolean;
	role?: typeof permissionLevel[keyof typeof permissionLevel];
	readonly created_at?: Date;
	readonly updated_at?: Date;
};

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, Partial<UserAttributes> {
  dataValues?: UserAttributes;
};

export type UserScopesAttributes = keyof ReturnType<typeof UserScope>;
export const UserProtectedFields = [];