// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CampusModel } from './campus.interface';
import CampusScope from './campus.scope';
import User from './../../users/model/user.model';
import Classroom from './../../classrooms/model/classroom.model';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(CampusScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema,
	tableName: 'campus'
})
export default class Campus extends S.Model implements CampusModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public name!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public address!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public postCode!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public city!: string;

	@S.AllowNull(false)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public open!: string;

	@S.AllowNull(false)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public virtual!: string;

	@S.HasMany(() => User, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE',
		as: 'Users'
	})
	public Users!: User[];

	@S.HasMany(() => Classroom, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE'
	})
	public Classrooms!: Classroom[];

	@S.ForeignKey(() => User)
	@S.Column({
    field: 'campus_manager_id',
  })
	public campusManagerId!: number;

	@S.BelongsTo(() => User, { 
		foreignKey: {
      field: 'campus_manager_id'
    },
		onDelete: 'SET NULL',
		as: 'CampusManager'
	})
	public CampusManager!: User;
}