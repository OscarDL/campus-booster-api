import { Model, Optional } from "sequelize";
import ClassroomScope from './classroom.scope';
import { CampusModel } from './../../campus/model/campus.interface';
import { ClassroomHasCourseModel } from './../../classroom_has_courses/model/classroomhascourse.interface';
import { UserHasClassroomModel } from './../../user_has_classrooms/model/user-hasclassroom.interface';
export interface ClassroomAttributes {
  readonly id?: number;
	name: string;
	promotion: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	campusId?: number;
	Campus?: CampusModel;
	ClassroomHasCourses?: ClassroomHasCourseModel[];
	UserHasClassrooms?: UserHasClassroomModel[];
};
export interface ClassroomCreationAttributes extends Optional<ClassroomAttributes, 'id'> {}
export interface ClassroomModel extends Model<ClassroomAttributes, ClassroomCreationAttributes>, Partial<ClassroomAttributes> {
  dataValues?: ClassroomAttributes;
};
export type ClassroomScopesAttributes = keyof ReturnType<typeof ClassroomScope>;
export const ClassroomProtectedFields = [];