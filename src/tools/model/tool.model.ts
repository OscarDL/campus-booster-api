// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { categories, Category, ToolModel } from './tool.interface';
import ToolScope from './tool.scope';

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
	@S.Column(S.DataType.ENUM(...categories))
	public category!: Category;
}