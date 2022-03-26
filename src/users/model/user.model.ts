// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { EMAIL_REGEX, UserModel } from './user.interface';
import UserScope from './user.scope';
import config from '../../../config/env.config';
const { permissionLevel } = config;


@S.Scopes(UserScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'users',
  schema: 'public'
})

export default class User extends S.Model implements UserModel {
	@S.PrimaryKey
  @S.AutoIncrement
  @S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(36))
	public azure_id!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public first_name!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public last_name!: string;

	@S.AllowNull(false)
	@S.IsEmail
	@S.Is('emailFormat', (email) => {
		if(!EMAIL_REGEX.test(email)) {
			throw new Error(`'${email}' is not a correct email format.`)
		}
	})
	@S.Column(S.DataType.STRING(255))
	public email!: string;

	@S.AllowNull(false)
	@S.IsDate
	@S.Column(S.DataType.DATE)
	public birthday!: Date;

	@S.AllowNull(false)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public active!: boolean;

	@S.AllowNull(false)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public is_validated!: boolean;

	@S.AllowNull(false)
	@S.Default(permissionLevel.User)
	@S.Column(S.DataType.SMALLINT)
	public role!: typeof permissionLevel[keyof typeof permissionLevel];
}