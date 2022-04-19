import { Model, Optional } from "sequelize";
import PlanningScope from './planning.scope';
import Course from './../../courses/model/course.model';
export interface PlanningAttributes {
  readonly id: number;
	date: string;
	canceled?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	courseId?: number;
	Course?: Course;
};
export interface PlanningCreationAttributes extends Optional<PlanningAttributes, 'id'> {}
export interface PlanningModel extends Model<PlanningAttributes, PlanningCreationAttributes>, Partial<PlanningAttributes> {
  dataValues?: PlanningAttributes;
};
export type PlanningScopesAttributes = keyof ReturnType<typeof PlanningScope>;
export const PlanningProtectedFields = [];