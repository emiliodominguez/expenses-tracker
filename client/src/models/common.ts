export interface IRequestPayload<T> {
	data: T;
	loading: boolean;
	error?: Error;
}
