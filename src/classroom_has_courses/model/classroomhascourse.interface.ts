import { TeacherModel } from './../../teachers/model/teacher.interface';
import { Model, Optional } from "sequelize";
import ClassroomHasCourseScope from './classroomhascourse.scope';
import { CourseModel } from './../../courses/model/course.interface';
import { ClassroomModel, ClassroomAttributes } from './../../classrooms/model/classroom.interface';
import { PlanningModel } from './../../plannings/model/planning.interface';
import { GradeModel } from './../../grades/model/grade.interface';
import { FeedbackModel } from './../../feedbacks/model/feedback.interface';
import { UnpackChildAttributes } from '../../../types/sequelize';
export interface ClassroomHasCourseAttributes extends 
	UnpackChildAttributes<"Classroom", ClassroomAttributes>
{
  readonly id: number;
	activated?: boolean;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	courseId: number;
	classroomId: number;
	Course?: CourseModel;
	Classroom?: ClassroomModel;
	Plannings?: PlanningModel[];
	Feedbacks?: FeedbackModel[];
	Grades?: GradeModel[];
	Teachers?: TeacherModel[];
}
export interface ClassroomHasCourseCreationAttributes extends Optional<ClassroomHasCourseAttributes, 'id'> {}
export interface ClassroomHasCourseModel extends 
	Model<ClassroomHasCourseAttributes, ClassroomHasCourseCreationAttributes>, 
	Partial<ClassroomHasCourseAttributes> {
		dataValues?: ClassroomHasCourseAttributes;
};
export type ClassroomHasCourseScopesAttributes = keyof ReturnType<typeof ClassroomHasCourseScope>;
export const ClassroomHasCourseProtectedFields = [];