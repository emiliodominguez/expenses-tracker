import { Users, Movements, Accounts, Stats, Options } from '@app/components/Pages';

export const routes = {
	users: { url: '/', label: 'Users', element: <Users /> },
	movements: { url: '/movements', label: 'Movements', element: <Movements /> },
	accounts: { url: '/accounts', label: 'Accounts', element: <Accounts /> },
	stats: { url: '/stats', label: 'Stats', element: <Stats /> },
	options: { url: '/options', label: 'Options', element: <Options /> }
};
