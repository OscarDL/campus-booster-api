import { Model, Optional } from "sequelize";
import AbsenceScope from './absence.scope';
import { PlanningModel } from './../../plannings/model/planning.interface';
import { UserModel } from "./../../users/model/user.interface";
export interface AbsenceAttributes {
  readonly id: number;
	reason?: string;
	late?: boolean;
	period?: PERIOD;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	planningId?: number;
	Planning?: PlanningModel;
	userId?: number;
	User?: UserModel;
	fileKeys?: string[];
	fileBase64?: string[];
};
export interface AbsenceCreationAttributes extends Optional<AbsenceAttributes, 'id'> {}
export interface AbsenceModel extends Model<AbsenceAttributes, AbsenceCreationAttributes>, Partial<AbsenceAttributes> {
  dataValues?: AbsenceAttributes;
};
export type AbsenceScopesAttributes = keyof ReturnType<typeof AbsenceScope>;
export const AbsenceProtectedFields = [];
export type PERIOD = "EARLY_MORNING" | "LATE_MORNING" | "EARLY_AFTERNOON" | "LATE_AFTERNOON" | "MORNING" | "AFTERNOON" | "FULL_DAY";