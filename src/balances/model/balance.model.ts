// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { BalanceModel, BalanceStatus } from './balance.interface';
import BalanceScope from './balance.scope';
import User from './../../users/model/user.model';

@S.Scopes(BalanceScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class Balance extends S.Model implements BalanceModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column({
		type: S.DataType.DATE,
		field: 'date_requested'
	})
	public dateRequested!: Date;

	@S.AllowNull(false)
	@S.Column({
		type: S.DataType.DATE,
		field: 'date_confirmed'
	})
	public dateConfirmed!: Date;

	@S.AllowNull(true)
  @S.Default('')
	@S.Column(S.DataType.STRING(1024))
	public description!: string;

	@S.AllowNull(true)
  @S.Default(0)
	@S.Column(S.DataType.FLOAT)
	public debit!: number;

	@S.AllowNull(true)
  @S.Default(0)
	@S.Column(S.DataType.FLOAT)
	public credit!: number;

  @S.AllowNull(false)
  @S.Default('')
  @S.Column(S.DataType.STRING(255))
  public status!: BalanceStatus;

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