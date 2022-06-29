import { injectable, inject } from 'inversify';
import { Services } from './services.enum';
import type HttpService from './http.service';
import { IMovement, TMovementPayload } from '@app/models';

@injectable()
export default class MovementsService {
	@inject(Services.HttpService)
	private readonly httpService: HttpService;

	private readonly apiUrl = `${process.env.REACT_APP_API_URL}/movements`;

	/**
	 * ### Gets all movements
	 * @param abortSignal The abort signal
	 * @returns The list of movements
	 */
	async get(userId: number, abortSignal?: AbortSignal): Promise<IMovement[]> {
		return await this.httpService.get<IMovement[]>({ url: `${this.apiUrl}/${userId}`, abortSignal });
	}

	/**
	 * ### Gets a movement by ID
	 * @param id The movement ID
	 * @param abortSignal The abort signal
	 * @returns The movement
	 */
	async getById(id: number, abortSignal?: AbortSignal): Promise<IMovement> {
		return await this.httpService.get<IMovement>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}

	/**
	 * ### Creates a movement
	 * @param payload The movement payload
	 * @param abortSignal The abort signal
	 * @returns The created movement
	 */
	async create(payload: TMovementPayload, abortSignal?: AbortSignal): Promise<IMovement> {
		return await this.httpService.post<IMovement, TMovementPayload>({ url: this.apiUrl, payload, abortSignal });
	}

	/**
	 * ### Updates a movement
	 * @param id The movement ID
	 * @param payload The movement payload
	 * @param abortSignal The abort signal
	 * @returns The updated movement
	 */
	async update(id: number, payload: Partial<TMovementPayload>, abortSignal?: AbortSignal): Promise<IMovement> {
		return await this.httpService.put<IMovement, Partial<TMovementPayload>>({ url: `${this.apiUrl}/${id}`, payload, abortSignal });
	}

	/**
	 * ### Deletes a movement
	 * @param id The movement ID
	 * @param abortSignal The abort signal
	 * @returns The deleted movement
	 */
	async delete(id: number, abortSignal?: AbortSignal): Promise<IMovement> {
		return await this.httpService.delete<IMovement>({ url: `${this.apiUrl}/${id}`, abortSignal });
	}
}
