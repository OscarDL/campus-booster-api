// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { ContractModel, TYPE, ContractAttributes } from './contract.interface';
import ContractScope from './contract.scope';
import User from './../../users/model/user.model';
import s3 from '../../../services/aws/s3';
import config from '../../../config/env.config';
import Teacher from './../../teachers/model/teacher.model';
const { db_schema } = config;

@S.Scopes(ContractScope)
@S.Table({
  tableName: 'contracts',
	modelName: 'Contract',
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
	@S.Column(S.DataType.TEXT)
	public mission!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public type!: TYPE;

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

	@S.AllowNull(true)
	@S.Default([])
	@S.Column({
		field: 'file_keys',
		type: S.DataType.ARRAY(
			S.DataType.TEXT
		)
	})
	public fileKeys!: string[];

	public dataValues!: ContractAttributes;

	@S.AfterCreate
	@S.AfterFind
	@S.AfterUpdate
	@S.AfterUpsert
	static async loadS3Files(instance: (Contract | Contract[])): Promise<void> {
		try {
			if(Array.isArray(instance)) {
				for (let i = 0; i < instance.length; i++) {
					const absence = instance[i];
					absence.dataValues.fileBase64 = await Contract.loadInstanceFiles(absence);
				}
			} else if(instance) {
				instance.dataValues.fileBase64 = await Contract.loadInstanceFiles(instance);
			}
		} catch (err) {
			if(err instanceof Error) {
				console.log(err.message.red.bold);
			}
		}
	}

	static async loadInstanceFiles(instance: Contract): Promise<string[]> {
		const files = new Array();
		for (let i = 0; i < instance.fileKeys.length; i++) {
			const fileKey = instance.fileKeys[i];
			if(fileKey) {
				const awsFile = await s3.download(fileKey);
				if(awsFile) {
					const imgBase64 = Buffer.from(awsFile.Body as any).toString('base64');
					files.push(`data:${awsFile.ContentType ?? 'images/png'};base64,${imgBase64}`); 
				}
			}
		}
		return files;
	}

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