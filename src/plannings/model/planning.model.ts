// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { PlanningModel } from './planning.interface';
import PlanningScope from './planning.scope';
import Course from './../../courses/model/course.model';

@S.Scopes(PlanningScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'plannings',
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
	public canceled!: string;

	@S.ForeignKey(() => Course)
	@S.Column({
		field: 'course_id'
	})
	public courseId!: number;

	@S.BelongsTo(() => Course, { 
		onDelete: 'CASCADE'
	})
	public Course!: Course;
}