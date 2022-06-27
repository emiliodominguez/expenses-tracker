import 'reflect-metadata';
import { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as IOCProvider } from 'inversify-react';
import reportWebVitals from './reportWebVitals';
import { UsersContextProvider, ConfigurationContextProvider, AccountsContextProvider } from './contexts';
import { container, routes } from './config';
import './services';
import './styles/main.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

/**
 * A recursion to render routes and child routes if there're any
 * @param route The route object
 * @returns The Route(s) element(s)
 */
function renderRoute(route: any): JSX.Element {
	return (
		<Fragment key={route.url}>
			<Route key={route.url} path={route.url} element={route.element}>
				{route.childRoutes && route.childRoutes.map(renderRoute)}
			</Route>
		</Fragment>
	);
}

root.render(
	<BrowserRouter>
		<IOCProvider container={container}>
			<UsersContextProvider>
				<ConfigurationContextProvider>
					<AccountsContextProvider>
						<Routes>{Object.values(routes).map(renderRoute)}</Routes>
					</AccountsContextProvider>
				</ConfigurationContextProvider>
			</UsersContextProvider>
		</IOCProvider>
	</BrowserRouter>
);

reportWebVitals();
