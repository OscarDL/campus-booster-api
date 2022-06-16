import { Model, Optional } from "sequelize";
import PlanningScope from './planning.scope';
import { ClassroomHasCourseModel } from './../../classroom_has_courses/model/classroomhascourse.interface';
export interface PlanningAttributes {
  readonly id: number;
	date: string;
	type: TYPE;
	period: PERIOD;
	remote: boolean;
	cancelled: boolean;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	classroomHasCourseId?: number;
	ClassroomHasCourse?: ClassroomHasCourseModel;
};
export interface PlanningCreationAttributes extends Optional<PlanningAttributes, 'id'> {}
export interface PlanningModel extends Model<PlanningAttributes, PlanningCreationAttributes>, Partial<PlanningAttributes> {
  dataValues?: PlanningAttributes;
};
export type PlanningScopesAttributes = keyof ReturnType<typeof PlanningScope>;
export const PlanningProtectedFields = [];
export type TYPE = 'COURSE' | 'PRACTICE_EXAM' | 'ORAL_EXAM';
export type PERIOD = 'FULL_DAY' | 'MORNING' | 'AFTERNOON';