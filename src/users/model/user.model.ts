// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { EMAIL_REGEX, UserModel } from './user.interface';
import UserScope from './user.scope';
import { v4 as uuidv4 } from 'uuid';
import config from '../../../config/env.config';
import { isBoolean } from 'lodash';
const { permissionLevel } = config;


@S.Scopes(UserScope)
@S.Table({
  timestamps: true,
  underscored: false,
  tableName: 'users',
  schema: 'public'
})
export default class User extends S.Model implements UserModel {
  
	@S.PrimaryKey
	@S.AllowNull(false)
	@S.Default(uuidv4())
	@S.Column(S.DataType.STRING(36))
	public id!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.TEXT)
	public azure_id!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.TEXT)
	public firstname!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.TEXT)
	public lastname!: string;

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

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public is_validate!: boolean;

	@S.AllowNull(true)
	@S.Default(permissionLevel.Student)
	@S.Column(S.DataType.INTEGER)
	public role!: typeof permissionLevel[keyof typeof permissionLevel];
}