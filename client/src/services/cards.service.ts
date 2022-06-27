import { injectable, inject } from 'inversify';
import { Services } from './services.enum';
import type HttpService from './http.service';
import { ICard, TCardPayload } from '@app/models';

@injectable()
export default class CardsService {
	@inject(Services.HttpService)
	private readonly httpService: HttpService;

	private readonly apiUrl = `${process.env.REACT_APP_API_URL}/cards`;

	/**
	 * ### Gets all cards
	 * @param abortSignal The abort signal
	 * @returns The list of cards
	 */
	async get(userId: number, abortSignal?: AbortSignal): Promise<ICard[]> {
		return await this.httpService.get<ICard[]>({ url: `${this.apiUrl}/${userId}`, abortSignal });
	}

	/**
	 * ### Gets an card by ID
	 * @param id The card ID
	 * @param abortSignal The abort signal
	 * @returns The card
	 */
	async getById(id: number, abortSignal?: AbortSignal): Promise<ICard> {
		return await this.httpService.get<ICard>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}

	/**
	 * ### Creates an card
	 * @param payload The card payload
	 * @param abortSignal The abort signal
	 * @returns The created card
	 */
	async create(payload: TCardPayload, abortSignal?: AbortSignal): Promise<ICard> {
		return await this.httpService.post<ICard, TCardPayload>({ url: this.apiUrl, payload, abortSignal });
	}

	/**
	 * ### Updates an card
	 * @param id The card ID
	 * @param payload The card payload
	 * @param abortSignal The abort signal
	 * @returns The updated card
	 */
	async update(id: number, payload: Partial<TCardPayload>, abortSignal?: AbortSignal): Promise<ICard> {
		return await this.httpService.put<ICard, Partial<TCardPayload>>({ url: `${this.apiUrl}/${id}`, payload, abortSignal });
	}

	/**
	 * ### Deletes an card
	 * @param id The card ID
	 * @param abortSignal The abort signal
	 * @returns The deleted card
	 */
	async delete(id: number, abortSignal?: AbortSignal): Promise<ICard> {
		return await this.httpService.delete<ICard>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}
}
