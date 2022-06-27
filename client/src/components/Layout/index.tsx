import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { useConfigurationContext, useUsersContext } from '@app/contexts';
import { routes } from '@app/config';
import { className } from '@app/shared/helpers';
import { Icon } from '../Shared';
import styles from './Layout.module.scss';

interface ILayoutProps {
	title: string;
	className?: string;
}

export default function Layout(props: PropsWithChildren<ILayoutProps>): JSX.Element {
	const { darkThemeActive, toggleDarkTheme } = useConfigurationContext();
	const { currentUser } = useUsersContext();

	return (
		<>
			<header className={styles.header}>
				<nav>
					{Object.values(routes).map(route => (
						<NavLink key={route.label} to={route.url} {...className({ [styles.inactive]: !currentUser })}>
							{route.label}
						</NavLink>
					))}
				</nav>

				<button {...className(styles.darkThemeToggler, { [styles.active]: darkThemeActive })} onClick={toggleDarkTheme}>
					<Icon name="lightBulb" size={30} />
				</button>
			</header>

			<main {...className(styles.main, props.className)}>
				<h2 className="page-title">{props.title}</h2>
				{props.children}
			</main>
		</>
	);
}
