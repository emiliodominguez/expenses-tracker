import { Users, Accounts, Banks, Cards, Movements, Options } from '@app/components/Pages';

export const routes = Object.freeze({
	users: {
		url: '/',
		label: 'Users',
		element: <Users />
	},
	movements: {
		url: '/movements',
		label: 'Movements',
		element: <Movements />
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
	// stats: {
	// 	url: '/stats',
	// 	label: 'Stats',
	// 	element: <Stats />
	// },
	options: {
		url: '/options',
		label: 'Options',
		element: <Options />
	}
});
