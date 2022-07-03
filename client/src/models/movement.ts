export interface IMovement {
	id: number;
	type: string;
	date: string;
	amount: number;
	currency: string;
	note?: string;
	user_id: number;
	account_id: number;
	card_id?: number;
	category_id?: number;
}

export enum MovementType {
	Expense = 'Expense',
	Income = 'Income'
}

export type TMovementPayload = Omit<IMovement, 'id'>;
