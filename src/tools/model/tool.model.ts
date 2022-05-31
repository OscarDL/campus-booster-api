// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { Category, ToolModel } from './tool.interface';
import ToolScope from './tool.scope';
import s3 from './../../../services/aws/s3';
import { ToolAttributes } from './tool.interface';

import config from '../../../config/env.config';
const { db_schema } = config;

@S.Scopes(ToolScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema
})
export default class Tool extends S.Model implements ToolModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(255))
	public img!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public url!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public title!: string;

	@S.AllowNull(true)
  @S.Default('')
	@S.Column(S.DataType.STRING(1024))
	public description!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(32)) 
	public category!: Category;

	public dataValues!: ToolAttributes;

	@S.AfterFind
	@S.AfterCreate
	@S.AfterUpdate
	@S.AfterUpsert
	static async loadS3Image(instance: (Tool | Tool[])): Promise<void> {
		try {
			if(Array.isArray(instance)) {
				for (let i = 0; i < instance.length; i++) {
					const tool = instance[i];
					if(tool.img) {
						const awsFile = await s3.download(tool.img);
						const imgBase64 = Buffer.from(awsFile.Body as any).toString('base64');
						tool.dataValues.imgBase64 = `data:${awsFile.ContentType ?? 'images/png'};base64,${imgBase64}`;
					}
				}
			} else {
				if(instance?.img) {
					const awsFile = await s3.download(instance.img);
					const imgBase64 = Buffer.from(awsFile.Body as any).toString('base64');
					instance.dataValues.imgBase64 = `data:${awsFile.ContentType ?? 'images/png'};base64,${imgBase64}`;
				}
			}
		} catch (err) {
			if(err instanceof Error) {
				console.log(err.message.red.bold);
			}
		}
	}
}