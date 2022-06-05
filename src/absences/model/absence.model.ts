// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { AbsenceModel, PERIOD } from './absence.interface';
import AbsenceScope from './absence.scope';
import Planning from './../../plannings/model/planning.model';
import User from './../../users/model/user.model';
import s3 from '../../../services/aws/s3';
import { AbsenceAttributes } from './absence.interface';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(AbsenceScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Absence extends S.Model implements AbsenceModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(true)
	@S.Column(S.DataType.TEXT)
	public reason!: string;

	@S.AllowNull(true)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public late!: boolean;

	@S.AllowNull(false)
  @S.Default('FULL_DAY')
	@S.Column(S.DataType.STRING(255))
	public period!: PERIOD;

	@S.AllowNull(true)
	@S.Default([])
	@S.Column({
		field: 'file_keys',
		type: S.DataType.ARRAY(
			S.DataType.STRING(1024)
		)
	})
	public fileKeys!: string[];

	public dataValues!: AbsenceAttributes;

	@S.AfterCreate
	@S.AfterFind
	@S.AfterUpdate
	@S.AfterUpsert
	static async loadS3Files(instance: (Absence | Absence[])): Promise<void> {
		try {
			if(Array.isArray(instance)) {
				for (let i = 0; i < instance.length; i++) {
					const absence = instance[i];
					absence.dataValues.fileBase64 = await Absence.loadInstanceFiles(absence);
				}
			} else if(instance) {
				instance.dataValues.fileBase64 = await Absence.loadInstanceFiles(instance);
			}
		} catch (err) {
			if(err instanceof Error) {
				console.log(err.message.red.bold);
			}
		}
	}

	static async loadInstanceFiles(instance: Absence): Promise<string[]> {
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

	@S.ForeignKey(() => Planning)
	@S.Column({
		field: 'planning_id'
	})
	public planningId!: number;

	@S.BelongsTo(() => Planning, { 
		foreignKey: {
      field: 'planning_id'
    },
		onDelete: 'CASCADE'
	})
	public Planning!: Planning;

	@S.ForeignKey(() => User)
	@S.Column({
		field: 'user_id'
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