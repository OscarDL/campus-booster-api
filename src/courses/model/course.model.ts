// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CourseModel, STATUS } from './course.interface';
import CourseScope from './course.scope';
import Speciality from './../../specialities/model/speciality.model';
import { BelongsToOptions, HasManyOptions } from 'sequelize/types';
import Class from '../../classrooms/model/classroom.model';
import Teacher from '../../teachers/model/teacher.model';
import Feedback from './../../feedbacks/model/feedback.model';

@S.Scopes(CourseScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'courses',
  schema: 'public'
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
    field: 'status',
    type: S.DataType.STRING(255)
  })
	public status!: STATUS;

	@S.AllowNull(false)
	@S.Column({
    field: 'link',
    type: S.DataType.STRING(255)
  })
	public link!: string;

	@S.AllowNull(false)
	@S.Column({
    field: 'description',
    type: S.DataType.STRING(2048)
  })
	public description!: string;

	@S.ForeignKey(() => Speciality)
	@S.Column({
		field: 'speciality_id'
	})
	public specialityId!: number;

	@S.BelongsTo(() => Speciality, { 
		foreignKey: {
      field: 'speciality_id'
    },
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Speciality!: Speciality;

	@S.ForeignKey(() => Class)
	@S.Column({
		field: 'classroom_id'
	})
	public classroomId!: number;

	@S.BelongsTo(() => Class, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Class!: Class;

	@S.HasMany(() => Teacher, { 
		foreignKey: {
      field: 'course_id'
    },
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Teachers!: Teacher[];

	@S.HasMany(() => Feedback, { 
		foreignKey: {
      field: 'course_id'
    },
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Feedbacks!: Feedback[];
}