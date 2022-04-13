// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { BelongsToOptions } from 'sequelize/types';
import User from '../../users/model/user.model';
import { FeedbackModel } from './feedback.interface';
import FeedbackScope from './feedback.scope';
import Teacher from './../../teachers/model/teacher.model';
import Course from '../../courses/model/course.model';

@S.Scopes(FeedbackScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'feedbacks',
  schema: 'public'
})
export default class Feedback extends S.Model implements FeedbackModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Min(0)
	@S.Max(5)
	@S.IsFloat
	@S.Column(S.DataType.FLOAT)
	public presentation!: string;

	@S.AllowNull(false)
	@S.Min(0)
	@S.Max(5)
	@S.IsFloat
	@S.Column(S.DataType.FLOAT)
	public pedagogy!: string;

	@S.AllowNull(false)
	@S.Min(0)
	@S.Max(5)
	@S.IsFloat
	@S.Column({
		type: S.DataType.FLOAT,
		field: 'technical_competence'
	})
	public technicalCompetence!: string;

	@S.AllowNull(false)
	@S.Min(0)
	@S.Max(5)
	@S.IsFloat
	@S.Column({
		type: S.DataType.FLOAT,
		field: 'fluency_in_speaking'
	})
	public fluencyInSpeaking!: string;

	@S.ForeignKey(() => User)
	@S.Column(
		{
			field: 'user_id',
		}
	)
	public userId!: number;

	@S.BelongsTo(() => User, { 
		foreignKey: 'user_id', 
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public User!: User;

	@S.ForeignKey(() => Teacher)
	@S.Column(
		{
			field: 'teacher_id',
		}
	)
	public teacherId!: number;

	@S.BelongsTo(() => Teacher, { 
		foreignKey: 'teacher_id', 
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Teacher!: Teacher;

	@S.ForeignKey(() => Course)
	@S.Column(
		{
			field: 'course_id',
		}
	)
	public courseId!: number;

	@S.BelongsTo(() => Course, { 
		foreignKey: 'course_id', 
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Course!: Course;
}