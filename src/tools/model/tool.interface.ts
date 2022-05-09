import { Model, Optional } from "sequelize";
import ToolScope from './tool.scope';
export const categories = <const> [ "general", "development", "infrastructure", "net-sec" ];
export type Category = typeof categories[number];
export interface ToolAttributes {
  readonly id: number;
	img: string;
	url: string;
	title: string;
	description?: string;
	b64?: string;
	category: Category;
	readonly created_at?: Date;
	readonly updated_at?: Date;
};
export interface ToolCreationAttributes extends Optional<ToolAttributes, 'id'> {}
export interface ToolModel extends Model<ToolAttributes, ToolCreationAttributes>, Partial<ToolAttributes> {
  dataValues?: ToolAttributes;
};
export type ToolScopesAttributes = keyof ReturnType<typeof ToolScope>;
export const ToolProtectedFields = [];