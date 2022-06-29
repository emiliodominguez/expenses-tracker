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

export type TMovementPayload = Omit<IMovement, 'id'>;
