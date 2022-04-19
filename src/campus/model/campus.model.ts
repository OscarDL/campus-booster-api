// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CampusModel } from './campus.interface';
import CampusScope from './campus.scope';
import User from './../../users/model/user.model';

@S.Scopes(CampusScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'campus',
  schema: 'public'
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
	@S.Column(S.DataType.STRING(255))
	public city!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public address!: string;

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public open!: string;

	@S.AllowNull(true)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public virtual!: string;

	@S.HasMany(() => User, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE'
	})
	public Users!: User[];
}