import { injectable } from 'inversify';

interface ResolverOptions<T = undefined> {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	payload?: T;
	headers?: HeadersInit;
	abortSignal?: AbortSignal;
}

@injectable()
export default class HttpService {
	/**
	 * ### The HTTP service get method
	 * @param options The resolver options
	 */
	async get<T>(options: Partial<ResolverOptions>): Promise<T> {
		return (await this.resolve<T>({ ...options, method: 'GET' } as ResolverOptions)) as T;
	}

	/**
	 * ### The HTTP service post method
	 * @param options The resolver options
	 */
	async post<T, P>(options: Partial<ResolverOptions<P>>): Promise<T> {
		return (await this.resolve<T, P>({ ...options, method: 'POST' } as ResolverOptions<P>)) as T;
	}

	/**
	 * ### The HTTP service put method
	 * @param options The resolver options
	 */
	async put<T, P>(options: Partial<ResolverOptions<P>>): Promise<T> {
		return (await this.resolve<T, P>({ ...options, method: 'PUT' } as ResolverOptions<P>)) as T;
	}

	/**
	 * ### The HTTP service delete method
	 * @param options The resolver options
	 */
	async delete<T>(options: Partial<ResolverOptions>): Promise<T> {
		return (await this.resolve<T>({ ...options, method: 'DELETE' } as ResolverOptions)) as T;
	}

	/**
	 * ### The fetch resolver
	 * @param options The resolver options
	 */
	private async resolve<T, P = undefined>(options: ResolverOptions<P>): Promise<T | string | void> {
		try {
			const response = await fetch(options.url, {
				method: options.method,
				signal: options.abortSignal,
				body: options.payload ? JSON.stringify(options.payload) : undefined,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json; charset=UTF-8',
					...options.headers
				}
			});

			if (response.status >= 200 && response.status < 300) {
				const contentType = response.headers.get('content-type');

				switch (true) {
					case contentType?.includes('application/text'):
						return await response.text();
					case contentType?.includes('application/json'):
						return await response.json();
					default:
						return {} as any;
				}
			} else {
				throw new Error(`${response.status}: ${response.statusText}`);
			}
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
