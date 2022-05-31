// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import User from '../../users/model/user.model';
import { FeedbackModel } from './feedback.interface';
import FeedbackScope from './feedback.scope';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';
import Teacher from '../../teachers/model/teacher.model';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(FeedbackScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Feedback extends S.Model implements FeedbackModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
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
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public User!: User;

	@S.ForeignKey(() => Teacher)
	@S.Column(
		{
			field: 'teacher_id',
		}
	)
	public teacherId!: number;

	@S.BelongsTo(() => Teacher, { 
		foreignKey: {
      field: 'teacher_id'
    },
		onDelete: 'CASCADE'
	})
	public Teacher!: Teacher;

	@S.ForeignKey(() => ClassroomHasCourse)
	@S.Column(
		{
			field: 'classroom_has_course_id',
		}
	)
	public courseId!: number;

	@S.BelongsTo(() => ClassroomHasCourse, { 
		foreignKey: {
      field: 'classroom_has_course_id'
    },
		onDelete: 'CASCADE'
	})
	public ClassroomHasCourse!: ClassroomHasCourse;
}