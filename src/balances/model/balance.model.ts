// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { BalanceModel } from './balance.interface';
import BalanceScope from './balance.scope';
import BalanceStatus from './../../balance-status/model/balance-status.model';
import User from './../../users/model/user.model';

@S.Scopes(BalanceScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'balances',
  schema: 'public'
})
export default class Balance extends S.Model implements BalanceModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column({
		type: S.DataType.DATE,
		field: 'date_req'
	})
	public dateReq!: Date;

	@S.AllowNull(false)
	@S.Column({
		type: S.DataType.DATE,
		field: 'date_ope'
	})
	public dateOpe!: Date;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(1024))
	public description!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.FLOAT)
	public debit!: number;

	@S.AllowNull(true)
	@S.Column(S.DataType.FLOAT)
	public credit!: number;

	@S.HasMany(() => BalanceStatus, { 
		foreignKey: {
      field: 'balance_id'
    },
		onDelete: 'CASCADE'
	})
	public BalanceStatus!: BalanceStatus[];

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
}