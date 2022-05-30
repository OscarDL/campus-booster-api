import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import CampusScope from './campus.scope';
import { ClassroomModel } from './../../classrooms/model/classroom.interface';
import User from "../../users/model/user.model";
export interface CampusAttributes {
  readonly id?: number;
	name: string;
	city: string;
	address: string;
	open?: string;
	virtual?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	Users?: UserModel[];
	Classrooms?: ClassroomModel[];
	campusManagerId: number;
	CampusManager?: User;
};
export interface CampusCreationAttributes extends Optional<CampusAttributes, 'id'> {}
export interface CampusModel extends Model<CampusAttributes, CampusCreationAttributes>, Partial<CampusAttributes> {
  dataValues?: CampusAttributes;
};
export type CampusScopesAttributes = keyof ReturnType<typeof CampusScope>;
export const CampusProtectedFields = [];