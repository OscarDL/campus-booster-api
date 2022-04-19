// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import User from '../../users/model/user.model';
import { ClassroomModel } from './classroom.interface';
import ClassroomScope from './classroom.scope';
import Course from '../../courses/model/course.model';

@S.Scopes(ClassroomScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'classrooms',
  schema: 'public'
})
export default class Classroom extends S.Model implements ClassroomModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.INTEGER)
	public section!: number;

	@S.HasMany(() => User, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	})
	public Users!: User[];
	
	@S.HasMany(() => Course, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	})
	public Courses!: Course[];
}