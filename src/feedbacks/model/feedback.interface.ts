import { Model, Optional } from "sequelize";
import FeedbackScope from './feedback.scope';
import { UserModel } from "./../../users/model/user.interface";
import { TeacherModel } from './../../teachers/model/teacher.interface';
import { CourseModel } from './../../courses/model/course.interface';
export interface FeedbackAttributes {
  readonly id: number;
	presentation: string;
	pedagogy: string;
	technicalCompetence: string;
	fluencyInSpeaking: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	userId?: number;
	User?: UserModel;
	teacherId?: number;
	Teacher?: TeacherModel;
	courseId?: number;
	Course?: CourseModel;
};
export interface FeedbackCreationAttributes extends Optional<FeedbackAttributes, 'id'> {}
export interface FeedbackModel extends Model<FeedbackAttributes, FeedbackCreationAttributes>, Partial<FeedbackAttributes> {
  dataValues?: FeedbackAttributes;
};
export type FeedbackScopesAttributes = keyof ReturnType<typeof FeedbackScope>;
export const FeedbackProtectedFields = [];