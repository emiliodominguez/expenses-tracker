import { Users, Accounts, Banks, Cards, Movements, Stats, Options } from '@app/components/Pages';

export const routes = Object.freeze({
	users: {
		url: '/',
		label: 'Users',
		element: <Users />
	},
	accounts: {
		url: '/accounts',
		label: 'Accounts',
		element: <Accounts />,
		childRoutes: [
			{ url: 'banks', label: 'Banks', element: <Banks /> },
			{ url: 'cards', label: 'Cards', element: <Cards /> }
		]
	},
	movements: {
		url: '/movements',
		label: 'Movements',
		element: <Movements />
	},
	stats: {
		url: '/stats',
		label: 'Stats',
		element: <Stats />
	},
	options: {
		url: '/options',
		label: 'Options',
		element: <Options />
	}
});
