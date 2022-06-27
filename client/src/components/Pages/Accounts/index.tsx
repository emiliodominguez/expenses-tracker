import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import Layout from '@app/components/Layout';
import styles from './Accounts.module.scss';
import { routes } from '@app/config';
import { useEffect } from 'react';

export function Accounts(): JSX.Element {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(routes.accounts.childRoutes[0].url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Layout title="Accounts" className={styles.accountsPage}>
			<div className={styles.nav}>
				{routes.accounts.childRoutes.map(route => (
					<NavLink key={route.label} to={route.url}>
						{route.label}
					</NavLink>
				))}
			</div>

			<Outlet />
		</Layout>
	);
}
