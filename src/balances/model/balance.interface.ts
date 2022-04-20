import { Model, Optional } from "sequelize";
import BalanceScope from './balance.scope';
import { UserModel } from "./../../users/model/user.interface";
import { BalanceStatusModel } from './../../balance-status/model/balance-status.interface';
export interface BalanceAttributes {
  readonly id: number;
	dateReq: Date;
	dateOpe: Date;
	description?: string;
	debit?: number;
	credit?: number;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	BalanceStatus?: BalanceStatusModel[];
	userId: number;
	User?: UserModel;
};
export interface BalanceCreationAttributes extends Optional<BalanceAttributes, 'id'> {}
export interface BalanceModel extends Model<BalanceAttributes, BalanceCreationAttributes>, Partial<BalanceAttributes> {
  dataValues?: BalanceAttributes;
};
export type BalanceScopesAttributes = keyof ReturnType<typeof BalanceScope>;
export const BalanceProtectedFields = [];