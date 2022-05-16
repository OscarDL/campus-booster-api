// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { PlanningModel } from './planning.interface';
import PlanningScope from './planning.scope';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';

@S.Scopes(PlanningScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class Planning extends S.Model implements PlanningModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.DATE)
	public date!: string;

	@S.AllowNull(true)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public cancelled!: string;

	@S.ForeignKey(() => ClassroomHasCourse)
	@S.Column({
		field: 'classroom_has_course_id'
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