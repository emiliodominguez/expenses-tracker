import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import type AccountsService from '@app/services/accounts.service';
import type CardsService from '@app/services/cards.service';
import { Services } from '@app/services/services.enum';
import { IRequestPayload, IAccount, TAccountPayload, ICard, TCardPayload } from '@app/models';
import { useUsersContext } from './UsersContext';

interface IAccountsContext {
	accountsData: IRequestPayload<IAccount>;
	cardsData: IRequestPayload<ICard>;
	createAccount: (payload: TAccountPayload) => Promise<IAccount>;
	updateAccount: (id: number, payload: TAccountPayload) => Promise<IAccount>;
	deleteAccount: (id: number) => Promise<IAccount>;
	createCard: (payload: TCardPayload) => Promise<ICard>;
	updateCard: (id: number, payload: TCardPayload) => Promise<ICard>;
	deleteCard: (id: number) => Promise<ICard>;
}

const AccountsContext = createContext<IAccountsContext>({} as IAccountsContext);

export function AccountsContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const { currentUser } = useUsersContext();
	const [accountsData, setAccountsData] = useState<IRequestPayload<IAccount>>({ data: [], loading: true });
	const [cardsData, setCardsData] = useState<IRequestPayload<ICard>>({ data: [], loading: true });
	const accountsService = useInjection<AccountsService>(Services.AccountsService);
	const cardsService = useInjection<CardsService>(Services.CardsService);

	//#region Accounts
	function getAccounts(): { abortController?: AbortController } {
		if (!currentUser) return {};

		const abortController = new AbortController();

		setAccountsData(prev => ({ ...prev, loading: true, error: undefined }));

		try {
			accountsService.get(currentUser.id, abortController.signal).then(data => {
				if (data) setAccountsData({ data, loading: false, error: undefined });
			});
		} catch (error) {
			setAccountsData(prev => ({ ...prev, loading: false, error: error as Error }));
		}

		return { abortController };
	}

	async function createAccount(payload: TAccountPayload): Promise<IAccount> {
		const createdAccount = await accountsService.create(payload);
		getAccounts();
		return createdAccount;
	}

	async function updateAccount(id: number, payload: TAccountPayload): Promise<IAccount> {
		const updatedAccount = await accountsService.update(id, payload);
		getAccounts();
		return updatedAccount;
	}

	async function deleteAccount(id: number): Promise<IAccount> {
		const deletedAccount = await accountsService.delete(id);
		getAccounts();
		return deletedAccount;
	}
	//#endregion

	//#region Cards
	function getCards(): { abortController?: AbortController } {
		if (!currentUser) return {};

		const abortController = new AbortController();

		setCardsData(prev => ({ ...prev, loading: true, error: undefined }));

		try {
			cardsService.get(currentUser.id, abortController.signal).then(data => {
				if (data) setCardsData({ data, loading: false, error: undefined });
			});
		} catch (error) {
			setCardsData(prev => ({ ...prev, loading: false, error: error as Error }));
		}

		return { abortController };
	}

	async function createCard(payload: TCardPayload): Promise<ICard> {
		const createdCard = await cardsService.create(payload);
		getCards();
		return createdCard;
	}

	async function updateCard(id: number, payload: TCardPayload): Promise<ICard> {
		const updatedCard = await cardsService.update(id, payload);
		getCards();
		return updatedCard;
	}

	async function deleteCard(id: number): Promise<ICard> {
		const deletedAccount = await cardsService.delete(id);
		getAccounts();
		return deletedAccount;
	}
	//#endregion

	useEffect(() => {
		const { abortController: getAccountsController } = getAccounts();
		const { abortController: getCardsController } = getCards();

		return () => {
			getAccountsController?.abort();
			getCardsController?.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return (
		<AccountsContext.Provider
			value={{
				accountsData,
				cardsData,
				createAccount,
				updateAccount,
				deleteAccount,
				createCard,
				updateCard,
				deleteCard
			}}>
			{props.children}
		</AccountsContext.Provider>
	);
}

export function useAccountsContext(): IAccountsContext {
	const context = useContext(AccountsContext);

	if (!Object.entries(context).length) {
		throw new Error('useAccountsContext must be used within AccountsContext');
	}

	return context;
}
