import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import CampusScope from './campus.scope';
import { ClassroomModel } from './../../classrooms/model/classroom.interface';
export interface CampusAttributes {
  readonly id?: number;
	name: string;
	address: string;
	postCode: string;
	city: string;
	open?: string;
	virtual?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	Users?: UserModel[];
	Classrooms?: ClassroomModel[];
	CampusManagers?: UserModel[];
};
export interface CampusCreationAttributes extends Optional<CampusAttributes, 'id'> {}
export interface CampusModel extends Model<CampusAttributes, CampusCreationAttributes>, Partial<CampusAttributes> {
  dataValues?: CampusAttributes;
};
export type CampusScopesAttributes = keyof ReturnType<typeof CampusScope>;
export const CampusProtectedFields = [];