import { Model, Optional } from "sequelize";
import CourseScope from './course.scope';
import { CourseContentModel } from './../../course-contents/model/course-content.interface';
import { ClassroomHasCourseModel } from "./../../classroom_has_courses/model/classroomhascourse.interface";
export interface CourseAttributes {
  readonly id?: number;
	name: string;
	status: STATUS;
	link: string;
	description: string;
	credits: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	specialityId?: number;
	CourseContents?: CourseContentModel[];
	ClassroomHasCourses?: ClassroomHasCourseModel[];
};
export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}
export interface CourseModel extends Model<CourseAttributes, CourseCreationAttributes>, Partial<CourseAttributes> {
  dataValues?: CourseAttributes;
};
export type CourseScopesAttributes = keyof ReturnType<typeof CourseScope>;
export const CourseProtectedFields = [];
export type STATUS = "";