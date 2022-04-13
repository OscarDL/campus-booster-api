// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { HasManyOptions } from 'sequelize/types';
import Course from '../../courses/model/course.model';
import User from '../../users/model/user.model';
import { SpecialityModel } from './speciality.interface';
import SpecialityScope from './speciality.scope';

@S.Scopes(SpecialityScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'specialities',
  schema: 'public'
})
export default class Speciality extends S.Model implements SpecialityModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column({
    field: 'name',
    type: S.DataType.STRING(255)
  })
	public name!: string;

	@S.HasMany(() => User, { 
		foreignKey: 'speciality_id', 
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Users!: User[];
	
	@S.HasMany(() => Course, { 
		foreignKey: 'speciality_id', 
		onDelete: 'CASCADE'
	} as HasManyOptions)
	public Courses!: Course[];
}