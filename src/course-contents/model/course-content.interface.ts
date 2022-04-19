import { Model, Optional } from "sequelize";
import CourseContentScope from './course-content.scope';
import { CourseModel } from './../../courses/model/course.interface';
export interface CourseContentAttributes {
  readonly id: number;
	name: string;
	link: string;
	availability?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	courseId?: number;
	Course?: CourseModel;
};
export interface CourseContentCreationAttributes extends Optional<CourseContentAttributes, 'id'> {}
export interface CourseContentModel extends Model<CourseContentAttributes, CourseContentCreationAttributes>, Partial<CourseContentAttributes> {
  dataValues?: CourseContentAttributes;
};
export type CourseContentScopesAttributes = keyof ReturnType<typeof CourseContentScope>;
export const CourseContentProtectedFields = [];