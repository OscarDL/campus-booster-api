import { Model, Optional } from "sequelize";
import { UserModel } from "../../users/model/user.interface";
import ClasseScope from './classe.scope';
import { CourseModel } from './../../courses/model/course.interface';
export interface ClasseAttributes {
  readonly id?: number;
	section: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	Users?: UserModel[];
	Courses?: CourseModel[];
};
export interface ClasseCreationAttributes extends Optional<ClasseAttributes, 'id'> {}
export interface ClasseModel extends Model<ClasseAttributes, ClasseCreationAttributes>, Partial<ClasseAttributes> {
  dataValues?: ClasseAttributes;
};
export type ClasseScopesAttributes = keyof ReturnType<typeof ClasseScope>;
export const ClasseProtectedFields = [];