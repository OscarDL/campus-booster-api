// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { UserHasClassroomModel } from './user-hasclassroom.interface';
import UserHasClassroomScope from './user-hasclassroom.scope';
import User from './../../users/model/user.model';
import Classroom from './../../classrooms/model/classroom.model';

@S.Scopes(UserHasClassroomScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: 'public'
})
export default class UserHasClassroom extends S.Model implements UserHasClassroomModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.BIGINT)
	public id!: number;

	@S.AllowNull(true)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public active!: boolean;

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

	@S.ForeignKey(() => Classroom)
	@S.Column({
		field: 'classroom_id'
	})
	public classroomId!: number;

	@S.BelongsTo(() => Classroom, { 
		foreignKey: {
      field: 'classroom_id'
    },
		onDelete: 'CASCADE'
	})
	public Classroom!: Classroom;
}