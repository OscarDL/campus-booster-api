import { Model, Optional } from "sequelize";
import CourseScope from './course.scope';
import { SpecialityModel } from './../../specialities/model/speciality.interface';
import { ClasseModel } from './../../classes/model/classe.interface';
export interface CourseAttributes {
  readonly id?: number;
	name: string;
	status: STATUS;
	link: string;
	description: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	speciality_id?: number;
	Speciality?: SpecialityModel;
	class_id?: number;
	Class?: ClasseModel;
};
export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}
export interface CourseModel extends Model<CourseAttributes, CourseCreationAttributes>, Partial<CourseAttributes> {
  dataValues?: CourseAttributes;
};
export type CourseScopesAttributes = keyof ReturnType<typeof CourseScope>;
export const CourseProtectedFields = [];
export type STATUS = "";