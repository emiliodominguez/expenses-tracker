import { injectable, inject } from 'inversify';
import { Services } from './services.enum';
import type HttpService from './http.service';
import { IUser, TUserPayload } from '@app/models';

@injectable()
export default class UsersService {
	@inject(Services.HttpService)
	private readonly httpService: HttpService;

	private readonly apiUrl = `${process.env.REACT_APP_API_URL}/users`;

	/**
	 * ### Gets all users
	 * @param abortSignal The abort signal
	 * @returns The list of users
	 */
	async get(abortSignal?: AbortSignal): Promise<IUser[]> {
		return await this.httpService.get<IUser[]>({ url: this.apiUrl, abortSignal });
	}

	/**
	 * ### Gets a user by ID
	 * @param id The user ID
	 * @param abortSignal The abort signal
	 * @returns The user
	 */
	async getById(id: number, abortSignal?: AbortSignal): Promise<IUser> {
		return await this.httpService.get<IUser>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}

	/**
	 * ### Creates a user
	 * @param payload The user payload
	 * @param abortSignal The abort signal
	 * @returns The created user
	 */
	async create(payload: TUserPayload, abortSignal?: AbortSignal): Promise<IUser> {
		return await this.httpService.post<IUser, TUserPayload>({ url: this.apiUrl, payload, abortSignal });
	}

	/**
	 * ### Updates a user
	 * @param id The user ID
	 * @param payload The user payload
	 * @param abortSignal The abort signal
	 * @returns The updated user
	 */
	async update(id: number, payload: Partial<TUserPayload>, abortSignal?: AbortSignal): Promise<IUser> {
		return await this.httpService.put<IUser, Partial<TUserPayload>>({ url: `${this.apiUrl}/${id}`, payload, abortSignal });
	}

	/**
	 * ### Deletes a user
	 * @param id The user ID
	 * @param abortSignal The abort signal
	 * @returns The deleted user
	 */
	async delete(id: number, abortSignal?: AbortSignal): Promise<IUser> {
		return await this.httpService.delete<IUser>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}
}
