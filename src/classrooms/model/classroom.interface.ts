import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import ClassroomScope from './classroom.scope';
import { CourseModel } from '../../courses/model/course.interface';
export interface ClassroomAttributes {
  readonly id?: number;
	section: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	Users?: UserModel[];
	Courses?: CourseModel[];
};
export interface ClassroomCreationAttributes extends Optional<ClassroomAttributes, 'id'> {}
export interface ClassroomModel extends Model<ClassroomAttributes, ClassroomCreationAttributes>, Partial<ClassroomAttributes> {
  dataValues?: ClassroomAttributes;
};
export type ClassroomScopesAttributes = keyof ReturnType<typeof ClassroomScope>;
export const ClassroomProtectedFields = [];