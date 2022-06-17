// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { EMAIL_REGEX, Gender, UserAttributes, UserModel } from './user.interface';
import UserScope from './user.scope';
import bcrypt from 'bcrypt';
import Campus from './../../campus/model/campus.model';
import Feedback from './../../feedbacks/model/feedback.model';
import Absence from './../../absences/model/absence.model';
import Grade from './../../grades/model/grade.model';
import Balance from './../../balances/model/balance.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';
import s3 from '../../../services/aws/s3';
import Contract from '../../contracts/model/contract.model';
import Teacher from '../../teachers/model/teacher.model';

import config from '../../../config/env.config';
const { db_schema, permissionLevel } = config;

@S.Scopes(UserScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class User extends S.Model implements UserModel {
	@S.PrimaryKey
  @S.AutoIncrement
  @S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
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
	@S.Is('emailFormat', (email) => {
		if(!EMAIL_REGEX.test(email)) {
			throw new Error(`'${email}' is not a correct email format.`)
		}
	})
	@S.Column({
    type: S.DataType.STRING(255),
    unique: true
  })
	public email!: string;

	@S.AllowNull(false)
	@S.IsEmail
	@S.Is('emailFormat', (email) => {
		if(!EMAIL_REGEX.test(email)) {
			throw new Error(`'${email}' is not a correct email format.`)
		}
	})
	@S.Column({
    type: S.DataType.STRING(255),
		field: 'personal_email'
  })
	public personalEmail!: string;

	@S.AllowNull(false)
	@S.IsDate
	@S.Column(S.DataType.DATE)
	public birthday!: Date;

	@S.AllowNull(true)
	@S.Column({
    field: 'avatar_key',
    type: S.DataType.STRING(1024)
  })
	public avatarKey!: string;

	@S.AllowNull(false)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public active!: boolean;

	@S.AllowNull(false)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public banned!: boolean;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public address!: string;
	
	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(1))
	public gender!: Gender;
	
	@S.AllowNull(true)
	@S.Column(S.DataType.INTEGER)
	public promotion!: number;
  
	@S.AllowNull(false)
	@S.Default(0)
	@S.Column(S.DataType.INTEGER)
	public credits!: number;

	@S.AllowNull(false)
	@S.Default(permissionLevel.Student)
	@S.Column(S.DataType.STRING(255))
	public role!: typeof permissionLevel[keyof typeof permissionLevel];

	public dataValues!: UserAttributes;

	@S.BeforeCreate
	static async encryptAzureID(instance: User): Promise<void> {
		if(instance?.azureId) instance.azureId = await bcrypt.hash(instance.azureId, 12);
	}

	@S.AfterCreate
	@S.AfterFind
	@S.AfterUpdate
	@S.AfterUpsert
	static async loadS3Image(instance: (User | User[])): Promise<void> {
		try {
			if(Array.isArray(instance)) {
				for (let i = 0; i < instance.length; i++) {
					const user = instance[i];
					if(user.avatarKey) {
						const awsFile = await s3.download(user.avatarKey);
						if(awsFile) {
							const imgBase64 = Buffer.from(awsFile.Body as any).toString('base64');
							user.dataValues.avatarBase64 = `data:${awsFile.ContentType ?? 'images/png'};base64,${imgBase64}`;
						}
					}
				}
			} else {
				if(instance?.avatarKey) {
					const awsFile = await s3.download(instance.avatarKey);
					if(awsFile) {
						const imgBase64 = Buffer.from(awsFile.Body as any).toString('base64');
						instance.dataValues.avatarBase64 = `data:${awsFile.ContentType ?? 'images/png'};base64,${imgBase64}`;
					}
				}
			}
		} catch (err) {
			console.log(err);
			if(err instanceof Error) {
				console.log(err.message.red.bold);
			}
		}
	}

	@S.ForeignKey(() => Campus)
  @S.AllowNull(true)
	@S.Column({
    field: 'campus_id',
  })
	public campusId!: number;

	@S.BelongsTo(() => Campus, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE',
		as: 'Campus'
	})
	public Campus!: Campus;

	@S.HasMany(() => UserHasClassroom, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public UserHasClassrooms!: UserHasClassroom[];

	@S.HasMany(() => Feedback, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public Feedbacks!: Feedback[];

	@S.HasMany(() => Absence, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public Absences !: Absence[];

	@S.HasMany(() => Grade, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public Grades!: Grade[];

	@S.HasMany(() => Balance, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public Balances!: Balance[];

	@S.HasMany(() => Contract, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE',
	})
	public Contracts!: Contract[];

	@S.HasMany(() => Teacher, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE',
	})
	public Teachers!: Teacher[];
}