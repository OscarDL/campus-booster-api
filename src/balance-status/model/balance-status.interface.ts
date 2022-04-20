import { Model, Optional } from "sequelize";
import BalanceStatusScope from './balance-status.scope';
import { BalanceModel } from './../../balances/model/balance.interface';
export interface BalanceStatusAttributes {
  readonly id: number;
	label: string;
	done: boolean;
	readonly created_at?: Date;
	readonly updated_at?: Date;
	balanceId: number;
	Balance?: BalanceModel;
}
export interface BalanceStatusCreationAttributes extends Optional<BalanceStatusAttributes, 'id'> {}
export interface BalanceStatusModel extends Model<BalanceStatusAttributes, BalanceStatusCreationAttributes>, Partial<BalanceStatusAttributes> {
  dataValues?: BalanceStatusAttributes;
};
export type BalanceStatusScopesAttributes = keyof ReturnType<typeof BalanceStatusScope>;
export const BalanceStatusProtectedFields = [];