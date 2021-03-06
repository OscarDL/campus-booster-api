import { UnpackChildAttributes } from './../../../types/sequelize.d';
import { Model, Optional } from "sequelize";
import CourseScope from './course.scope';
import { ClassroomHasCourseAttributes, ClassroomHasCourseModel } from "./../../classroom_has_courses/model/classroomhascourse.interface";
export interface CourseAttributes extends 
	UnpackChildAttributes<"ClassroomHasCourses", ClassroomHasCourseAttributes>
{
  readonly id?: number;
	name: string;
	link: string;
	year: number;
	credits: number;
	speciality: boolean;
	description: string;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	ClassroomHasCourses?: ClassroomHasCourseModel[];
};
export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}
export interface CourseModel extends 
	Model<CourseAttributes, CourseCreationAttributes>, 
	Partial<CourseAttributes> {
		dataValues?: CourseAttributes;
};
export type CourseScopesAttributes = keyof ReturnType<typeof CourseScope>;
export const CourseProtectedFields = [];