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
import Teacher from './../../teachers/model/teacher.model';
import Feedback from './../../feedbacks/model/feedback.model';
import Attendance from './../../attendances/model/attendance.model';
import Grade from './../../grades/model/grade.model';
import Balance from './../../balances/model/balance.model';
import UserHasClassroom from './../../user_has_classrooms/model/user-hasclassroom.model';


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
	@S.Default(permissionLevel.Student)
	@S.Column(S.DataType.STRING(255))
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
	@S.Column({
    field: 'campus_id',
  })
	public campusId!: number;

	@S.BelongsTo(() => Campus, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE'
	})
	public Campus!: Campus;

	@S.HasMany(() => UserHasClassroom, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public UserHasClassrooms!: UserHasClassroom[];

	@S.HasMany(() => Teacher, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public Teachers!: Teacher[];

	@S.HasMany(() => Feedback, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	public Feedbacks!: Feedback[];

	@S.HasMany(() => Attendance, { 
		foreignKey: {
      field: 'user_id'
    },
		onDelete: 'CASCADE'
	})
	Attendances !: Attendance[];

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
}