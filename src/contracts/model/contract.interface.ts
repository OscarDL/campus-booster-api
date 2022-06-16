import { Model, Optional } from "sequelize";
import { TeacherModel } from "./../../teachers/model/teacher.interface";
import { UserModel } from "./../../users/model/user.interface";
import ContractScope from './contract.scope';
export interface ContractAttributes {
  readonly id: number;
	startDate: Date;
	endDate: Date;
	mission: string;
	type: TYPE;
	email: string;
	phone: string;
	address: string;
	company: string;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	userId: number;
	User?: UserModel;
	supervisorId: number;
	Supervisor?: TeacherModel;
	fileKeys?: string[];
	fileBase64?: string[];
};
export interface ContractCreationAttributes extends Optional<ContractAttributes, 'id'> {}
export interface ContractModel extends Model<ContractAttributes, ContractCreationAttributes>, Partial<ContractAttributes> {
  dataValues?: ContractAttributes;
};
export type ContractScopesAttributes = keyof ReturnType<typeof ContractScope>;
export const ContractProtectedFields = [];
export type TYPE = "PROFESSIONAL_CONTRACT" | "APPRENTICE_CONTRACT" | "FULL_TIME_INTERNSHIP" | "PART_TIME_INTERNSHIP";