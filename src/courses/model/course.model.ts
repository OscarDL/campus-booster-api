// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CourseModel } from './course.interface';
import CourseScope from './course.scope';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(CourseScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Course extends S.Model implements CourseModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column({
    field: 'name',
    type: S.DataType.STRING(255)
  })
	public name!: string;

	@S.AllowNull(false)
	@S.Column({
    field: 'link',
    type: S.DataType.STRING(255)
  })
	public link!: string;

	@S.AllowNull(false)
	@S.Column({
    field: 'credits',
    type: S.DataType.INTEGER
  })
	public credits!: number;

	@S.AllowNull(false)
	@S.Min(1)
	@S.Max(5)
	@S.Column({
    field: 'year',
    type: S.DataType.INTEGER
  })
	public year!: number;

	@S.AllowNull(false)
	@S.Column({
    field: 'description',
    type: S.DataType.STRING(2048)
  })
	public description!: string;

	@S.AllowNull(true)
  @S.Default(false)
	@S.Column({
    field: 'speciality',
    type: S.DataType.BOOLEAN
  })
	public speciality!: boolean;

	@S.HasMany(() => ClassroomHasCourse, { 
		foreignKey: {
      field: 'course_id'
    },
		onDelete: 'CASCADE'
	})
	public ClassroomHasCourses!: ClassroomHasCourse[];
}