import { Model, Optional } from "sequelize";
import ProjectScope from './project.scope';
import { ClassroomHasCourseModel } from '../../classroom_has_courses/model/classroomhascourse.interface';
export interface ProjectAttributes {
  readonly id: number;
	startDate: string;
	endDate: string;
	title: string;
	details?: string;
	link: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	classroomHasCourseId?: number;
	ClassroomHasCourse?: ClassroomHasCourseModel;
};
export interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}
export interface ProjectModel extends Model<ProjectAttributes, ProjectCreationAttributes>, Partial<ProjectAttributes> {
  dataValues?: ProjectAttributes;
};
export type ProjectScopesAttributes = keyof ReturnType<typeof ProjectScope>;
export const ProjectProtectedFields = [];