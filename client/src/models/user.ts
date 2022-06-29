import { IAccount, ICard } from '.';

export interface IUser {
	id: number;
	name: string;
	email: string;
	birth_date: string;
	accounts: IAccount[];
	cards: ICard[];
}

export type TUserPayload = Omit<IUser, 'id' | 'accounts' | 'cards'>;
