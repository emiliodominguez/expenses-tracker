export interface IAccount {
	id: number;
	name: string;
	balance: number;
	currency: string;
	type: string;
	active: boolean;
	note?: string;
	user_id: number;
}

export type TAccountPayload = Omit<IAccount, 'id'>;
