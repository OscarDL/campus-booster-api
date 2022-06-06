// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { ProjectModel } from './project.interface';
import ProjectScope from './project.scope';
import ClassroomHasCourse from '../../classroom_has_courses/model/classroomhascourse.model';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(ProjectScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Project extends S.Model implements ProjectModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.DATE)
	public startDate!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.DATE)
	public endDate!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public title!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.TEXT)
	public details!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public link!: string;

	@S.ForeignKey(() => ClassroomHasCourse)
	@S.Column({
		field: 'classroom_has_course_id'
	})
	public classroomHasCourseId!: number;

	@S.BelongsTo(() => ClassroomHasCourse, { 
		foreignKey: {
      field: 'classroom_has_course_id'
    },
		onDelete: 'CASCADE'
	})
	public ClassroomHasCourse!: ClassroomHasCourse;
}