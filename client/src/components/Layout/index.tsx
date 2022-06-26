import { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import { useConfigurationContext } from '@app/contexts';
import { routes } from '@app/config';
import { className } from '@app/shared/helpers';
import styles from './Layout.module.scss';

interface ILayoutProps {
	className?: string;
}

export default function Layout(props: PropsWithChildren<ILayoutProps>): JSX.Element {
	const { darkThemeActive, toggleDarkTheme } = useConfigurationContext();

	return (
		<>
			<header className={styles.header}>
				<nav>
					{Object.values(routes).map(route => (
						<NavLink key={route.label} to={route.url}>
							{route.label}
						</NavLink>
					))}
				</nav>

				<button onClick={toggleDarkTheme}>{`${darkThemeActive ? 'Dark' : 'Light'} theme`}</button>
			</header>

			<main {...className(styles.main, props.className)}>{props.children}</main>
		</>
	);
}
