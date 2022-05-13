// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import User from '../../users/model/user.model';
import { ClassroomModel } from './classroom.interface';
import ClassroomScope from './classroom.scope';
import Course from '../../courses/model/course.model';
import Campus from './../../campus/model/campus.model';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';

@S.Scopes(ClassroomScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class Classroom extends S.Model implements ClassroomModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.INTEGER)
	public section!: number;

	@S.HasMany(() => ClassroomHasCourse, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	})
	public ClassroomHasCourses!: ClassroomHasCourse[];

	@S.HasMany(() => UserHasClassroom, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	})
	public UserHasClassrooms!: UserHasClassroom[];

	@S.ForeignKey(() => Campus)
	@S.Column({
		field: 'campus_id'
	})
	public campusId!: number;

	@S.BelongsTo(() => Campus, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE'
	})
	public Campus!: Campus;
}