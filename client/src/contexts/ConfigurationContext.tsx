import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

interface IConfigurationContext {
	darkThemeActive: boolean;
}

interface IConfigurationContextPayload extends IConfigurationContext {
	toggleDarkTheme: () => void;
}

const ConfigurationContext = createContext<IConfigurationContextPayload>({} as IConfigurationContextPayload);

export function ConfigurationContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const [configuration, setConfiguration] = useState<IConfigurationContext>({ darkThemeActive: true });

	function toggleDarkTheme(): void {
		setConfiguration(prev => ({ ...configuration, darkThemeActive: !prev.darkThemeActive }));
	}

	useEffect(() => {
		document.body.classList[configuration.darkThemeActive ? 'add' : 'remove']('dark-theme');
	}, [configuration.darkThemeActive]);

	return <ConfigurationContext.Provider value={{ ...configuration, toggleDarkTheme }}>{props.children}</ConfigurationContext.Provider>;
}

export function useConfigurationContext(): IConfigurationContextPayload {
	const context = useContext(ConfigurationContext);

	if (!Object.entries(context).length) {
		throw new Error('useConfigurationContext must be used within ConfigurationContext');
	}

	return context;
}
