// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { EMAIL_REGEX, UserModel } from './user.interface';
import UserScope from './user.scope';
import config from '../../../config/env.config';
const { permissionLevel } = config;
import bcrypt from 'bcrypt';
import Campus from './../../campus/model/campus.model';
import { BelongsToOptions, HasManyOptions } from 'sequelize/types';
import Speciality from './../../specialities/model/speciality.model';
import Class from './../../classes/model/classe.model';
import Teacher from './../../teachers/model/teacher.model';
import Feedback from './../../feedbacks/model/feedback.model';


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
	@S.Column({
    field: 'azure_id',
    type: S.DataType.STRING(255)
  })
	public azureId!: string;

	@S.AllowNull(false)
	@S.Column({
    field: 'first_name',
    type: S.DataType.STRING(255)
  })
	public firstName!: string;

	@S.AllowNull(false)
	@S.Column({
    field: 'last_name',
    type: S.DataType.STRING(255)
  })
	public lastName!: string;

	@S.AllowNull(false)
	@S.IsEmail
	@S.Unique
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
	public validated!: boolean;

	@S.AllowNull(false)
	@S.Default(permissionLevel.User)
	@S.Column(S.DataType.SMALLINT)
	public role!: typeof permissionLevel[keyof typeof permissionLevel];


	// ---------------------
	// @BEFORE CREATE/UPDATE
	// ---------------------

	@S.BeforeCreate
	@S.BeforeUpdate
	static async encryptAzureID(instance: User) {
		if(instance?.azureId) instance.azureId = await bcrypt.hash(instance.azureId, 12);
	}

	@S.ForeignKey(() => Campus)
	@S.Column(
		{
			field: 'campus_id',
		}
	)
	public campusId!: number;

	@S.BelongsTo(() => Campus, { 
		foreignKey: 'campus_id', 
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Campus!: Campus;

	@S.ForeignKey(() => Speciality)
	@S.Column(
		{
			field: 'speciality_id',
		}
	)
	public specialityId!: number;

	@S.BelongsTo(() => Speciality, { 
		foreignKey: 'speciality_id', 
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Speciality!: Speciality;

	@S.ForeignKey(() => Class)
	@S.Column(
		{
			field: 'class_id',
		}
	)
	public classId!: number;

	@S.BelongsTo(() => Class, { 
		foreignKey: 'class_id', 
		onDelete: 'CASCADE'
	} as BelongsToOptions)
	public Class!: Class;

	@S.HasMany(() => Teacher, { 
		foreignKey: 'user_id', 
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Teachers!: Teacher[];

	@S.HasMany(() => Feedback, { 
		foreignKey: 'user_id', 
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Feedbacks!: Feedback[];
}