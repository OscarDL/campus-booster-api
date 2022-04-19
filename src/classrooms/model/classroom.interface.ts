import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import ClassroomScope from './classroom.scope';
import { CourseModel } from '../../courses/model/course.interface';
import { CampusModel } from './../../campus/model/campus.interface';
import { ClassroomHasCourseModel } from './../../classroom_has_courses/model/classroomhascourse.interface';
export interface ClassroomAttributes {
  readonly id?: number;
	section: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	campusId?: number;
	Campus?: CampusModel;
	Users?: UserModel[];
	ClassroomHasCourses?: ClassroomHasCourseModel[];
};
export interface ClassroomCreationAttributes extends Optional<ClassroomAttributes, 'id'> {}
export interface ClassroomModel extends Model<ClassroomAttributes, ClassroomCreationAttributes>, Partial<ClassroomAttributes> {
  dataValues?: ClassroomAttributes;
};
export type ClassroomScopesAttributes = keyof ReturnType<typeof ClassroomScope>;
export const ClassroomProtectedFields = [];