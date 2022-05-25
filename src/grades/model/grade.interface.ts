import { TeacherModel } from './../../teachers/model/teacher.interface';
import { Model, Optional } from "sequelize";
import { UserModel } from "./../../users/model/user.interface";
import GradeScope from './grade.scope';
import { ClassroomHasCourseAttributes } from './../../classroom_has_courses/model/classroomhascourse.interface';
export interface GradeAttributes {
  readonly id: number;
	average: number;
	comment?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	userId: number;
	classroomHasCourseId: number;
	User?: UserModel;
	teacherId?: number;
	Teacher?: TeacherModel;
	ClassroomHasCourse?: ClassroomHasCourseAttributes;
};
export interface GradeCreationAttributes extends Optional<GradeAttributes, 'id'> {}
export interface GradeModel extends 
	Model<GradeAttributes, GradeCreationAttributes>, 
	Partial<GradeAttributes>,
	GradeModelAttributes
{};
export interface GradeModelAttributes {
	dataValues?: GradeAttributes;
}
export type GradeScopesAttributes = keyof ReturnType<typeof GradeScope>;
export const GradeProtectedFields = [];