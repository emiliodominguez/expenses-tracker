import { Users, Accounts, Movements, Stats, Options } from '@app/components/Pages';

export const routes = {
	users: { url: '/', label: 'Users', element: <Users /> },
	accounts: { url: '/accounts', label: 'Accounts', element: <Accounts /> },
	movements: { url: '/movements', label: 'Movements', element: <Movements /> },
	stats: { url: '/stats', label: 'Stats', element: <Stats /> },
	options: { url: '/options', label: 'Options', element: <Options /> }
};
