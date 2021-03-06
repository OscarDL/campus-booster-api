// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import User from '../../users/model/user.model';
import { ClassroomModel } from './classroom.interface';
import ClassroomScope from './classroom.scope';
import Campus from './../../campus/model/campus.model';
import ClassroomHasCourse from './../../classroom_has_courses/model/classroomhascourse.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';
import moment from 'moment';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(ClassroomScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Classroom extends S.Model implements ClassroomModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public name!: string;

	@S.AllowNull(true)
	@S.Default(moment().get('year'))
	@S.Column(S.DataType.INTEGER)
	public promotion!: number;

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