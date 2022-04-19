import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import TeacherScope from './teacher.scope';
import { ClassroomHasCourseModel } from './../../classroom_has_courses/model/classroomhascourse.interface';
export interface TeacherAttributes {
  readonly id: number;
	active?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	userId?: number;
	User?: UserModel;
	classroomHasCourseId?: number;
	ClassroomHasCourse?: ClassroomHasCourseModel;
};
export interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}
export interface TeacherModel extends Model<TeacherAttributes, TeacherCreationAttributes>, Partial<TeacherAttributes> {
  dataValues?: TeacherAttributes;
};
export type TeacherScopesAttributes = keyof ReturnType<typeof TeacherScope>;
export const TeacherProtectedFields = [];