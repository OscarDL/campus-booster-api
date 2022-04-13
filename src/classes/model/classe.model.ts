// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { HasManyOptions } from 'sequelize/types';
import User from '../../users/model/user.model';
import { ClasseModel } from './classe.interface';
import ClasseScope from './classe.scope';
import Course from './../../courses/model/course.model';

@S.Scopes(ClasseScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'classes',
  schema: 'public'
})
export default class Class extends S.Model implements ClasseModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.INTEGER)
	public section!: number;

	@S.HasMany(() => User, { 
		foreignKey: 'class_id', 
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Users!: User[];
	
	@S.HasMany(() => Course, { 
		foreignKey: 'class_id', 
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Courses!: Course[];
}