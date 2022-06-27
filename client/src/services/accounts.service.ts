import { injectable, inject } from 'inversify';
import { Services } from './services.enum';
import type HttpService from './http.service';
import { IAccount, TAccountPayload } from '@app/models';

@injectable()
export default class AccountsService {
	@inject(Services.HttpService)
	private readonly httpService: HttpService;

	private readonly apiUrl = `${process.env.REACT_APP_API_URL}/accounts`;

	/**
	 * ### Gets all accounts
	 * @param abortSignal The abort signal
	 * @returns The list of accounts
	 */
	async get(userId: number, abortSignal?: AbortSignal): Promise<IAccount[]> {
		return await this.httpService.get<IAccount[]>({ url: `${this.apiUrl}/${userId}`, abortSignal });
	}

	/**
	 * ### Gets an account by ID
	 * @param id The account ID
	 * @param abortSignal The abort signal
	 * @returns The account
	 */
	async getById(id: number, abortSignal?: AbortSignal): Promise<IAccount> {
		return await this.httpService.get<IAccount>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}

	/**
	 * ### Creates an account
	 * @param payload The account payload
	 * @param abortSignal The abort signal
	 * @returns The created account
	 */
	async create(payload: TAccountPayload, abortSignal?: AbortSignal): Promise<IAccount> {
		return await this.httpService.post<IAccount, TAccountPayload>({ url: this.apiUrl, payload, abortSignal });
	}

	/**
	 * ### Updates an account
	 * @param id The account ID
	 * @param payload The account payload
	 * @param abortSignal The abort signal
	 * @returns The updated account
	 */
	async update(id: number, payload: Partial<TAccountPayload>, abortSignal?: AbortSignal): Promise<IAccount> {
		return await this.httpService.put<IAccount, Partial<TAccountPayload>>({ url: `${this.apiUrl}/${id}`, payload, abortSignal });
	}

	/**
	 * ### Deletes an account
	 * @param id The account ID
	 * @param abortSignal The abort signal
	 * @returns The deleted account
	 */
	async delete(id: number, abortSignal?: AbortSignal): Promise<IAccount> {
		return await this.httpService.delete<IAccount>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}
}
