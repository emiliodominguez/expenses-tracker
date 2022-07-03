import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import type AccountsService from '@app/services/accounts.service';
import type CardsService from '@app/services/cards.service';
import { Services } from '@app/services/services.enum';
import { IAccount, TAccountPayload, ICard, TCardPayload } from '@app/models';
import { useUsersContext } from './UsersContext';

interface IAccountsContext {
	accounts: IAccount[];
	cards: ICard[];
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
	const [accounts, setAccounts] = useState<IAccount[]>([]);
	const [cards, setCards] = useState<ICard[]>([]);
	const accountsService = useInjection<AccountsService>(Services.AccountsService);
	const cardsService = useInjection<CardsService>(Services.CardsService);

	//#region Accounts
	async function getAccounts(): Promise<void> {
		if (!currentUser) return;

		const data = await accountsService.get(currentUser.id);
		if (data) setAccounts(data);
	}

	async function createAccount(payload: TAccountPayload): Promise<IAccount> {
		const account = await accountsService.create(payload);
		await getAccounts();
		return account;
	}

	async function updateAccount(id: number, payload: TAccountPayload): Promise<IAccount> {
		const account = await accountsService.update(id, payload);
		await getAccounts();
		return account;
	}

	async function deleteAccount(id: number): Promise<IAccount> {
		const account = await accountsService.delete(id);
		await getAccounts();
		return account;
	}
	//#endregion

	//#region Cards
	async function getCards(): Promise<void> {
		if (!currentUser) return;
		const data = await cardsService.get(currentUser.id);
		if (data) setCards(data);
	}

	async function createCard(payload: TCardPayload): Promise<ICard> {
		const card = await cardsService.create(payload);
		await getCards();
		return card;
	}

	async function updateCard(id: number, payload: TCardPayload): Promise<ICard> {
		const card = await cardsService.update(id, payload);
		await getCards();
		return card;
	}

	async function deleteCard(id: number): Promise<ICard> {
		const card = await cardsService.delete(id);
		await getCards();
		return card;
	}
	//#endregion

	//#region Initial setup
	useEffect(() => {
		if (currentUser) {
			setAccounts(currentUser.accounts ?? []);
			setCards(currentUser.cards ?? []);
		}
	}, [currentUser]);
	//#endregion

	return (
		<AccountsContext.Provider
			value={{
				accounts,
				cards,
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
