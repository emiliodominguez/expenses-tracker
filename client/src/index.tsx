import 'reflect-metadata';
// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider as IOCProvider } from 'inversify-react';
import reportWebVitals from './reportWebVitals';
import { UsersContextProvider, ConfigurationContextProvider, AccountsContextProvider } from './contexts';
import { container, routes } from './config';
import './services';
import './styles/main.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	// <StrictMode>
	<BrowserRouter>
		<IOCProvider container={container}>
			<UsersContextProvider>
				<ConfigurationContextProvider>
					<AccountsContextProvider>
						<Routes>
							{Object.values(routes).map(route => (
								<Route key={route.label} path={route.url} element={route.element} />
							))}
						</Routes>
					</AccountsContextProvider>
				</ConfigurationContextProvider>
			</UsersContextProvider>
		</IOCProvider>
	</BrowserRouter>
	// </StrictMode>
);

reportWebVitals();
