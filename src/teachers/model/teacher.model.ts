// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { TeacherModel } from './teacher.interface';
import TeacherScope from './teacher.scope';
import User from './../../users/model/user.model';
import { BelongsToOptions } from 'sequelize/types';
import Course from './../../courses/model/course.model';

@S.Scopes(TeacherScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'teachers',
  schema: 'public'
})
export default class Teacher extends S.Model implements TeacherModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public active!: string;

	@S.ForeignKey(() => User)
	@S.Column(
		{
			field: 'user_id',
		}
	)
	public userId!: number;

	@S.BelongsTo(() => User, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public User!: User;
	
	@S.ForeignKey(() => Course)
	@S.Column(
		{
			field: 'course_id',
		}
	)
	public courseId!: number;

	@S.BelongsTo(() => Course, { 
		foreignKey: {
      field: 'course_id'
    },
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Course!: Course;
}