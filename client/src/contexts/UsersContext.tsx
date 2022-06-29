import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInjection } from 'inversify-react';
import type UsersService from '@app/services/users.service';
import { Services } from '@app/services/services.enum';
import { IRequestPayload, IUser, TUserPayload } from '@app/models';
import { routes } from '@app/config';

interface IUsersContext {
	usersData: IRequestPayload<IUser>;
	currentUser: IUser | null;
	setCurrentUser: (user: IUser) => void;
	createUser: (payload: TUserPayload) => Promise<IUser>;
	updateUser: (id: number, payload: TUserPayload) => Promise<IUser>;
	deleteUser: (id: number) => Promise<IUser>;
}

const UsersContext = createContext<IUsersContext>({} as IUsersContext);

// const localStorageKey = 'ET_USER';

export function UsersContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const [usersData, setUsersData] = useState<IRequestPayload<IUser>>({ data: [], loading: true });
	const [currentUser, setCurrentUser] = useState<IUser | null>(null);
	const usersService = useInjection<UsersService>(Services.UsersService);
	const navigate = useNavigate();

	function getUsers(): { abortController: AbortController } {
		const abortController = new AbortController();

		setUsersData(prev => ({ ...prev, loading: true, error: undefined }));

		try {
			usersService.get(abortController.signal).then(data => {
				if (data) setUsersData({ data, loading: false, error: undefined });
			});
		} catch (error) {
			setUsersData(prev => ({ ...prev, loading: false, error: error as Error }));
		}

		return { abortController };
	}

	async function createUser(payload: TUserPayload): Promise<IUser> {
		const createdUser = await usersService.create(payload);
		getUsers();
		return createdUser;
	}

	async function updateUser(id: number, payload: TUserPayload): Promise<IUser> {
		const updatedUser = await usersService.update(id, payload);
		getUsers();
		return updatedUser;
	}

	async function deleteUser(id: number): Promise<IUser> {
		const deletedUser = await usersService.delete(id);
		getUsers();
		if (id === currentUser?.id) setCurrentUser(null);
		return deletedUser;
	}

	// function getStoredUser(): IUser | null {
	// 	const user = localStorage.getItem(localStorageKey);
	// 	return user ? JSON.parse(user) : null;
	// }

	useEffect(() => {
		const { abortController } = getUsers();

		return () => {
			abortController?.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!currentUser) navigate(routes.users.url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, navigate]);

	return (
		<UsersContext.Provider
			value={{
				usersData,
				currentUser,
				setCurrentUser,
				createUser,
				updateUser,
				deleteUser
			}}>
			{props.children}
		</UsersContext.Provider>
	);
}

export function useUsersContext(): IUsersContext {
	const context = useContext(UsersContext);

	if (!Object.entries(context).length) {
		throw new Error('useUsersContext must be used within UsersContext');
	}

	return context;
}
