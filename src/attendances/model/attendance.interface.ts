import { Model, Optional } from "sequelize";
import AttendanceScope from './attendance.scope';
import { PlanningModel } from './../../plannings/model/planning.interface';
import { UserModel } from "./../../users/model/user.interface";
export interface AttendanceAttributes {
  readonly id: number;
	reason?: string;
	missing?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	planningId?: number;
	Planning?: PlanningModel;
	userId?: number;
	User?: UserModel;
};
export interface AttendanceCreationAttributes extends Optional<AttendanceAttributes, 'id'> {}
export interface AttendanceModel extends Model<AttendanceAttributes, AttendanceCreationAttributes>, Partial<AttendanceAttributes> {
  dataValues?: AttendanceAttributes;
};
export type AttendanceScopesAttributes = keyof ReturnType<typeof AttendanceScope>;
export const AttendanceProtectedFields = [];