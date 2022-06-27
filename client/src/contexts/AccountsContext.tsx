import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import type AccountsService from '@app/services/accounts.service';
import { Services } from '@app/services/services.enum';
import { IRequestPayload, IAccount, TAccountPayload } from '@app/models';
import { useUsersContext } from './UsersContext';

interface IAccountsContext {
	accounts: IAccount[];
	loading: boolean;
	error?: Error;
	createAccount: (payload: TAccountPayload) => Promise<IAccount>;
	updateAccount: (id: number, payload: TAccountPayload) => Promise<IAccount>;
	deleteAccount: (id: number) => Promise<IAccount>;
}

const AccountsContext = createContext<IAccountsContext>({} as IAccountsContext);

export function AccountsContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const { currentUser } = useUsersContext();
	const [accountsData, setAccountsData] = useState<IRequestPayload<IAccount[]>>({ data: [], loading: true });
	const accountsService = useInjection<AccountsService>(Services.AccountsService);

	function getAccounts(): { abortController?: AbortController } {
		if (!currentUser) return {};

		const abortController = new AbortController();

		setAccountsData(prev => ({ ...prev, error: undefined }));

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

	useEffect(() => {
		const { abortController } = getAccounts();

		return () => {
			abortController?.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return (
		<AccountsContext.Provider
			value={{
				accounts: accountsData.data,
				loading: accountsData.loading,
				error: accountsData.error,
				createAccount,
				updateAccount,
				deleteAccount
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
