// SEQUELIZE TYPESCRIPT MODEL
// DOC : https://www.npmjs.com/package/sequelize-typescript
// Generate by Ulysse Dupont
import * as S from 'sequelize-typescript';
import { CampusModel } from './campus.interface';
import CampusScope from './campus.scope';
import User from './../../users/model/user.model';
import Classroom from './../../classrooms/model/classroom.model';
import config from '../../../config/env.config';
const { db_schema, permissionLevel: roles } = config;

@S.Scopes(CampusScope)
@S.Table({
  timestamps: true,
  underscored: true,
  schema: db_schema,
	tableName: 'campus'
})
export default class Campus extends S.Model implements CampusModel {
  @S.PrimaryKey
	@S.AutoIncrement
	@S.Column(S.DataType.INTEGER)
	public id!: number;

	@S.AllowNull(false)
	@S.Column(S.DataType.STRING(255))
	public name!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public address!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public postCode!: string;

	@S.AllowNull(false)
	@S.Default('')
	@S.Column(S.DataType.STRING(255))
	public city!: string;

	@S.AllowNull(false)
	@S.Default(true)
	@S.Column(S.DataType.BOOLEAN)
	public open!: boolean;

	@S.AllowNull(false)
	@S.Default(false)
	@S.Column(S.DataType.BOOLEAN)
	public virtual!: boolean;

	@S.HasMany(() => User, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE'
	})
	public Users!: User[];

	@S.HasMany(() => Classroom, { 
		foreignKey: {
      field: 'campus_id'
    },
		onDelete: 'CASCADE'
	})
	public Classrooms!: Classroom[];

	@S.AfterFind
	static async AddCampusManager(instance: Campus | Campus[]) {
		try {
			if(instance) {
				if(Array.isArray(instance)) {
					for (let i = 0; i < instance.length; i++) {
						if(instance[i].Users) {
							instance[i].setDataValue(
								"CampusManager", 
								instance[i].Users.find(u => u.role === roles.CampusManager)
							);
							instance[i].setDataValue(
								"Users", 
								instance[i].Users.filter(u => u.role !== roles.CampusManager)
							);
						}
					}
				} else {
					if(instance.Users) {
						instance.setDataValue(
							"CampusManager", 
							instance.Users.find(u => u.role === roles.CampusManager)
						);
            instance.setDataValue(
              "Users", 
              instance.Users.filter(u => u.role !== roles.CampusManager)
            );
					}
				}
			}
			return instance;
		} catch (err) {
			if(err instanceof Error) {
				console.log(err.message.red.bold);
			}
		}
	}
}