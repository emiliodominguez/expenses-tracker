import UsersPage from '@app/components/Pages/UsersPage';

export const routes = {
	users: { url: '/', label: 'Users', element: <UsersPage /> },
	movements: { url: '/movements', label: 'Movements', element: <></> },
	accounts: { url: '/accounts', label: 'Accounts', element: <></> },
	stats: { url: '/stats', label: 'Stats', element: <></> },
	options: { url: '/options', label: 'Options', element: <></> }
};
