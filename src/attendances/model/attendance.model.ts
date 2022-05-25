// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { AttendanceModel } from './attendance.interface';
import AttendanceScope from './attendance.scope';
import Planning from './../../plannings/model/planning.model';
import User from './../../users/model/user.model';
import s3 from '../../../services/aws/s3';
import { AttendanceAttributes } from './attendance.interface';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(AttendanceScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Attendance extends S.Model implements AttendanceModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(true)
	@S.Column(S.DataType.TEXT)
	public reason!: string;

	@S.AllowNull(true)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public missing!: boolean;

	@S.AllowNull(true)
	@S.Default([])
	@S.IsArray
	@S.Column({
		field: 'file_keys',
		type: S.DataType.ARRAY(
			S.DataType.STRING(1024)
		)
	})
	public fileKeys!: string[];

	public dataValues!: AttendanceAttributes;

	@S.AfterCreate
	@S.AfterFind
	@S.AfterUpdate
	@S.AfterUpsert
	static async loadS3Files(instance: (Attendance | Attendance[])): Promise<void> {
		try {
			if(Array.isArray(instance)) {
				for (let i = 0; i < instance.length; i++) {
					const attendance = instance[i];
					attendance.dataValues.fileBase64 = await Attendance.loadInstanceFiles(attendance);
				}
			} else if(instance) {
				instance.dataValues.fileBase64 = await Attendance.loadInstanceFiles(instance);
			}
		} catch (err) {
			if(err instanceof Error) {
				console.log(err.message.red.bold);
			}
		}
	}

	static async loadInstanceFiles(instance: Attendance): Promise<string[]> {
		const files = new Array();
		for (let i = 0; i < instance.fileKeys.length; i++) {
			const fileKey = instance.fileKeys[i];
			if(fileKey) {
				const file = await s3.download(fileKey);
				if(file) await files.push(file.Body); 
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