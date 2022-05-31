// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { ContractModel, STATUS } from './contract.interface';
import ContractScope from './contract.scope';
import User from './../../users/model/user.model';

import config from '../../../config/env.config';
import Teacher from './../../teachers/model/teacher.model';
const { db_schema } = config;

@S.Scopes(ContractScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Contract extends S.Model implements ContractModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column({
		type: S.DataType.DATE,
		field: 'start_date'
	})
	public startDate!: Date;

	@S.AllowNull(false)
	@S.Column({
		type: S.DataType.DATE,
		field: 'end_date'
	})
	public endDate!: Date;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(1024))
	public mission!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(20))
	public status!: STATUS;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public url!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public email!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public phone!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public address!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public company!: string;

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
    field: 'supervisor_id',
  })
	public supervisorId!: number;

	@S.BelongsTo(() => Teacher, { 
		foreignKey: {
      field: 'supervisor_id'
    },
		onDelete: 'CASCADE'
	})
	public Supervisor!: Teacher;
}