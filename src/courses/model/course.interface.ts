import { Model, Optional } from "sequelize";
import CourseScope from './course.scope';
import { SpecialityModel } from './../../specialities/model/speciality.interface';
import { ClassroomModel } from '../../classrooms/model/classroom.interface';
import { TeacherModel } from './../../teachers/model/teacher.interface';
import { FeedbackModel } from './../../feedbacks/model/feedback.interface';
import { CourseContentModel } from './../../course-contents/model/course-content.interface';
import { PlanningModel } from './../../plannings/model/planning.interface';
import { ClassroomHasCourseModel } from "./../../classroom_has_courses/model/classroomhascourse.interface";
export interface CourseAttributes {
  readonly id?: number;
	name: string;
	status: STATUS;
	link: string;
	description: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	specialityId?: number;
	Speciality?: SpecialityModel;
	Teachers?: TeacherModel[];
	Feedbacks?: FeedbackModel[];
	CourseContents?: CourseContentModel[];
	Plannings?: PlanningModel[];
	ClassroomHasCourses?: ClassroomHasCourseModel[];
};
export interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}
export interface CourseModel extends Model<CourseAttributes, CourseCreationAttributes>, Partial<CourseAttributes> {
  dataValues?: CourseAttributes;
};
export type CourseScopesAttributes = keyof ReturnType<typeof CourseScope>;
export const CourseProtectedFields = [];
export type STATUS = "";