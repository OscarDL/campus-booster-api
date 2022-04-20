// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { BalanceStatusModel } from './balance-status.interface';
import BalanceStatusScope from './balance-status.scope';
import Balance from './../../balances/model/balance.model';

@S.Scopes(BalanceStatusScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'balance-status',
  schema: 'public'
})
export default class BalanceStatus extends S.Model implements BalanceStatusModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public label!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.BOOLEAN)
	public done!: boolean;
	
	@S.ForeignKey(() => Balance)
	@S.Column({
    field: 'balance_id',
	})
	public balanceId!: number;

	@S.BelongsTo(() => Balance, { 
		foreignKey: {
      field: 'balance_id'
    },
		onDelete: 'CASCADE'
	})
	public Balance!: Balance;
}