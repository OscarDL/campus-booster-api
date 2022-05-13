// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CourseContentModel } from './course-content.interface';
import CourseContentScope from './course-content.scope';
import Course from './../../courses/model/course.model';

@S.Scopes(CourseContentScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class CourseContent extends S.Model implements CourseContentModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(1024))
	public name!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(1024))
	public link!: string;

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public availability!: string;

	@S.ForeignKey(() => Course)
	@S.Column({
		field: 'course_id'
	})
	public courseId!: number;

	@S.BelongsTo(() => Course, { 
		foreignKey: {
      field: 'course_id'
    },
		onDelete: 'CASCADE'
	})
	public Course!: Course;
}