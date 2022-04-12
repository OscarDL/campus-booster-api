import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import SpecialityScope from './speciality.scope';
import { CourseModel } from './../../courses/model/course.interface';
export interface SpecialityAttributes {
  readonly id?: number;
	name: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	Users?: UserModel[];
	Courses?: CourseModel[];
};
export interface SpecialityCreationAttributes extends Optional<SpecialityAttributes, 'id'> {}
export interface SpecialityModel extends Model<SpecialityAttributes, SpecialityCreationAttributes>, Partial<SpecialityAttributes> {
  dataValues?: SpecialityAttributes;
};
export type SpecialityScopesAttributes = keyof ReturnType<typeof SpecialityScope>;
export const SpecialityProtectedFields = [];