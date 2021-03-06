import { Model, Optional } from "sequelize";
import BalanceScope from './balance.scope';
import { UserModel } from "./../../users/model/user.interface";
export const balanceStatus = <const> [ "PENDING", "CANCELLED", "CONFIRMED", "PROCESSING" ];
export type BalanceStatus = typeof balanceStatus[number];
export interface BalanceAttributes {
  readonly id: number;
	description: string;
	dateRequested: Date;
	dateConfirmed?: Date;
	debit: number;
	credit: number;
	status: BalanceStatus;
	readonly createdAt?: Date;
	readonly updatedAt?: Date;
	userId: number;
	User?: UserModel;
};
export interface BalanceCreationAttributes extends Optional<BalanceAttributes, 'id'> {}
export interface BalanceModel extends Model<BalanceAttributes, BalanceCreationAttributes>, Partial<BalanceAttributes> {
  dataValues?: BalanceAttributes;
};
export type BalanceScopesAttributes = keyof ReturnType<typeof BalanceScope>;
export const BalanceProtectedFields = [];