// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { AttendanceModel } from './attendance.interface';
import AttendanceScope from './attendance.scope';
import Planning from './../../plannings/model/planning.model';
import User from './../../users/model/user.model';

@S.Scopes(AttendanceScope)
@S.Table({
  timestamps: true,
  underscored: true,
  tableName: 'attendances',
  schema: 'public'
})
export default class Attendance extends S.Model implements AttendanceModel {
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
	public missing!: string;

	@S.ForeignKey(() => Planning)
	@S.Column({
		field: 'planning_id'
	})
	public planningId!: number;

	@S.BelongsTo(() => Planning, { 
		onDelete: 'CASCADE'
	})
	public Planning!: Planning;

	@S.ForeignKey(() => User)
	@S.Column({
		field: 'user_id'
	})
	public userId!: number;

	@S.BelongsTo(() => User, { 
		onDelete: 'CASCADE'
	})
	public User!: User;
}