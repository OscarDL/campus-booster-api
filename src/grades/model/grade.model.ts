// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { GradeModel } from './grade.interface';
import GradeScope from './grade.scope';
import User from './../../users/model/user.model';
import Teacher from './../../teachers/model/teacher.model';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';

@S.Scopes(GradeScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class Grade extends S.Model implements GradeModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.FLOAT)
	public average!: number;

	@S.AllowNull(true)
	@S.Column(S.DataType.TEXT)
	public comment!: string;

	@S.ForeignKey(() => User)
	@S.Column({
    field: 'user_id',
	})
	public userId!: number;

	@S.BelongsTo(() => User, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public User!: User;

	@S.ForeignKey(() => Teacher)
	@S.Column({
    field: 'teacher_id',
	})
	public teacherId!: number;

	@S.BelongsTo(() => Teacher, { 
		foreignKey: {
      field: 'teacher_id'
    },
		onDelete: 'CASCADE'
	})
	public Teacher!: Teacher;

	@S.ForeignKey(() => ClassroomHasCourse)
	@S.Column({
    field: 'classroom_has_course_id',
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