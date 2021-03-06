// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { TeacherModel } from './teacher.interface';
import TeacherScope from './teacher.scope';
import User from './../../users/model/user.model';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';
import Feedback from './../../feedbacks/model/feedback.model';
import Grade from './../../grades/model/grade.model';

import config from '../../../config/env.config';
import Contract from './../../contracts/model/contract.model';
const { db_schema } = config;

@S.Scopes(TeacherScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Teacher extends S.Model implements TeacherModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public active!: boolean;

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
	
	@S.ForeignKey(() => ClassroomHasCourse)
	@S.Column(
		{
			field: 'classroom_has_course_id',
		}
	)
	public classroomHasCourseId!: number;

	@S.BelongsTo(() => ClassroomHasCourse, { 
		foreignKey: {
      field: 'classroom_has_course_id'
    },
		onDelete: 'CASCADE'
	})
	public ClassroomHasCourse!: ClassroomHasCourse;

	@S.HasMany(() => Feedback, { 
		foreignKey: {
      field: 'teacher_id'
    },
		onDelete: 'CASCADE'
	})
	public Feedbacks!: Feedback[];

	@S.HasMany(() => Grade, { 
		foreignKey: {
      field: 'teacher_id'
    },
		onDelete: 'CASCADE'
	})
	public Grades!: Grade[];

	@S.HasMany(() => Contract, { 
		foreignKey: {
      field: 'supervisor_id'
    },
		onDelete: 'CASCADE'
	})
	public Contracts!: Contract[];
}