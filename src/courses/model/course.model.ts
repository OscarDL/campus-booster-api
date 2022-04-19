// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CourseModel, STATUS } from './course.interface';
import CourseScope from './course.scope';
import Speciality from './../../specialities/model/speciality.model';
import Classroom from '../../classrooms/model/classroom.model';
import Teacher from '../../teachers/model/teacher.model';
import Feedback from './../../feedbacks/model/feedback.model';
import CourseContent from './../../course-contents/model/course-content.model';
import Planning from './../../plannings/model/planning.model';

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
		onDelete: 'CASCADE'
	})
	public Speciality!: Speciality;

	@S.ForeignKey(() => Classroom)
	@S.Column({
		field: 'classroom_id'
	})
	public classroomId!: number;

	@S.BelongsTo(() => Classroom, { 
		onDelete: 'CASCADE'
	})
	public Classroom!: Classroom;

	@S.HasMany(() => Teacher, { 
		onDelete: 'CASCADE'
	})
	public Teachers!: Teacher[];

	@S.HasMany(() => Feedback, { 
		onDelete: 'CASCADE'
	})
	public Feedbacks!: Feedback[];

	@S.HasMany(() => CourseContent, { 
		onDelete: 'CASCADE'
	})
	public CourseContents!: CourseContent[];

	@S.HasMany(() => Planning, { 
		onDelete: 'CASCADE'
	})
	public Plannings!: Planning[];
}