// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { categories, Category, ToolModel } from './tool.interface';
import ToolScope from './tool.scope';
import s3 from './../../../services/aws/s3';

@S.Scopes(ToolScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class Tool extends S.Model implements ToolModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public img!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public url!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public title!: string;

	@S.AllowNull(true)
	@S.Column(S.DataType.STRING(1024))
	public description!: string;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(32)) 
	public category!: Category;

	@S.AfterFind
	@S.AfterCreate
	@S.AfterUpdate
	@S.AfterUpsert
	static async loadS3Image(instance: (Tool | Tool[])) {
		try {
			if(Array.isArray(instance)) {
				for (let i = 0; i < instance.length; i++) {
					const tool = instance[i];
					const awsFile = await s3.download(tool.img);
					const b64 = Buffer.from(awsFile.Body as any).toString('base64');
					(tool as any).dataValues.b64 = `data:${awsFile.ContentType ?? 'images/png'};base64, ${b64}`;
				}
			} else {
				const awsFile = await s3.download(instance.img);
				const b64 = Buffer.from(awsFile.Body as any).toString('base64');
				(instance as any).dataValues.b64 = `data:${awsFile.ContentType ?? 'images/png'};base64, ${b64}`;
			}
		} catch (err) {
			console.log(`${err}`.error.bold);
		}
	}
}