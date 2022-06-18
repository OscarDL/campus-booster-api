import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import TeacherScope from './teacher.scope';
import { ClassroomHasCourseModel } from './../../classroom_has_courses/model/classroomhascourse.interface';
import { FeedbackModel } from './../../feedbacks/model/feedback.interface';
import { GradeModel } from './../../grades/model/grade.interface';
export interface TeacherAttributes {
  readonly id: number;
	active?: boolean;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	userId?: number;
	User?: UserModel;
	classroomHasCourseId?: number;
	ClassroomHasCourse?: ClassroomHasCourseModel;
	Feedbacks?: FeedbackModel[];
	Grades?: GradeModel[];
};
export interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}
export interface TeacherModel extends Model<TeacherAttributes, TeacherCreationAttributes>, Partial<TeacherAttributes> {
  dataValues?: TeacherAttributes;
};
export type TeacherScopesAttributes = keyof ReturnType<typeof TeacherScope>;
export const TeacherProtectedFields = [];