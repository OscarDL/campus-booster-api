import { Model, Optional } from "sequelize";
import ToolScope from './tool.scope';
export const categories = <const> [ "general", "development", "infrastructure", "net-sec" ];
export type Category = typeof categories[number];
export interface ToolAttributes {
  readonly id: number;
	img: string | null;
	url: string;
	title: string;
	category: Category;
	imgBase64?: string;
	description?: string;
	readonly created_at?: Date;
	readonly updated_at?: Date;
};
export interface ToolCreationAttributes extends Optional<ToolAttributes, 'id'> {}
export interface ToolModel extends Model<ToolAttributes, ToolCreationAttributes>, Partial<ToolAttributes> {
  dataValues?: ToolAttributes;
};
export type ToolScopesAttributes = keyof ReturnType<typeof ToolScope>;
export const ToolProtectedFields = [];