export interface ICard {
	id: number;
	brand: string;
	bank: string;
	type: string;
	balance?: number;
	number: number;
	expiration_date: string;
	user_id: number;
}

export type TCardPayload = Omit<ICard, 'id'>;
