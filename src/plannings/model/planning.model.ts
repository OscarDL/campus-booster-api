// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { PERIOD, PlanningModel, TYPE } from './planning.interface';
import PlanningScope from './planning.scope';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';

import config from '../../../config/env.config';
import Absence from '../../absences/model/absence.model';
const { db_schema } = config;

@S.Scopes(PlanningScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Planning extends S.Model implements PlanningModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.DATE)
	public date!: string;

	@S.AllowNull(false)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public remote!: boolean;

	@S.AllowNull(false)
	@S.Default('COURSE')
	@S.Column(S.DataType.STRING(255))
	public type!: TYPE;

	@S.AllowNull(false)
	@S.Default('FULL_DAY')
	@S.Column(S.DataType.STRING(255))
	public period!: PERIOD;

	@S.AllowNull(false)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public cancelled!: boolean;

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

	@S.HasMany(() => Absence, { 
		foreignKey: {
      field: 'planning_id'
    },
		onDelete: 'CASCADE'
	})
	public Absences !: Absence[];
}