import { Model, Optional } from "sequelize";
import ClassroomHasCourseScope from './classroomhascourse.scope';
import { CourseModel } from './../../courses/model/course.interface';
import { ClassroomModel } from './../../classrooms/model/classroom.interface';
import { TeacherModel } from './../../teachers/model/teacher.interface';
import { PlanningModel } from './../../plannings/model/planning.interface';
export interface ClassroomHasCourseAttributes {
  readonly id: number;
	activated?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	courseId: number;
	classroomId: number;
	Course?: CourseModel;
	Classroom?: ClassroomModel;
	Teachers?: TeacherModel[];
	Plannings?: PlanningModel[];
};
export interface ClassroomHasCourseCreationAttributes extends Optional<ClassroomHasCourseAttributes, 'id'> {}
export interface ClassroomHasCourseModel extends Model<ClassroomHasCourseAttributes, ClassroomHasCourseCreationAttributes>, Partial<ClassroomHasCourseAttributes> {
  dataValues?: ClassroomHasCourseAttributes;
};
export type ClassroomHasCourseScopesAttributes = keyof ReturnType<typeof ClassroomHasCourseScope>;
export const ClassroomHasCourseProtectedFields = [];