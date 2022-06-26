export interface IUser {
	id: number;
	name: string;
	email: string;
	birth_date: string;
}

export type TUserPayload = Omit<IUser, 'id'>;
