// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import Course from './../../courses/model/course.model';
import { ClassroomHasCourseModel } from './classroomhascourse.interface';
import ClassroomHasCourseScope from './classroomhascourse.scope';
import Classroom from './../../classrooms/model/classroom.model';
import Teacher from './../../teachers/model/teacher.model';
import Planning from './../../plannings/model/planning.model';

@S.Scopes(ClassroomHasCourseScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'classroom-has-courses',
  schema: 'public'
})
export default class ClassroomHasCourse extends S.Model implements ClassroomHasCourseModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public activated!: string;

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

	@S.ForeignKey(() => Classroom)
	@S.Column({
		field: 'classroom_id'
	})
	public classroomId!: number;

	@S.BelongsTo(() => Course, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	})
	public Classroom!: Classroom;

	@S.HasMany(() => Teacher, { 
		foreignKey: {
      field: 'classroom_has_course_id'
    },
		onDelete: 'CASCADE'
	})
	public Teachers!: Teacher[];

	@S.HasMany(() => Planning, { 
		foreignKey: {
      field: 'classroom_has_course_id'
    },
		onDelete: 'CASCADE'
	})
	public Plannings!: Planning[];
}