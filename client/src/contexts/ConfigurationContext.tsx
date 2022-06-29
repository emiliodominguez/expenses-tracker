import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { generateColorScale } from '@app/shared/helpers';
import { useUsersContext } from './UsersContext';

interface IConfigurationContext {
	darkThemeActive: boolean;
	primaryColor: string;
	accentColor: string;
}

interface IConfigurationContextPayload extends IConfigurationContext {
	toggleDarkTheme: () => void;
	setThemeColors: (primaryColor?: string, accentColor?: string) => void;
}

const ConfigurationContext = createContext<IConfigurationContextPayload>({} as IConfigurationContextPayload);

const lsConfigurationKey = 'ET_CONFIGURATION';

const defaultConfiguration = Object.freeze<IConfigurationContext>({
	darkThemeActive: true,
	primaryColor: '#6e62c2',
	accentColor: '#4062bb'
});

type ConfigurationKeys = keyof IConfigurationContext;

export function ConfigurationContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const { currentUser } = useUsersContext();
	const userStorageKey = useMemo(() => `${lsConfigurationKey}_${currentUser?.id}`, [currentUser]);
	const [configuration, setConfiguration] = useState<IConfigurationContext>({
		darkThemeActive: getStoredConfigurationByKey('darkThemeActive'),
		primaryColor: getStoredConfigurationByKey('primaryColor'),
		accentColor: getStoredConfigurationByKey('accentColor')
	});

	function getStoredConfiguration(): void {
		setConfiguration(
			prev =>
				Object.keys(prev).reduce(
					(acc, key) => ({ ...acc, [key]: getStoredConfigurationByKey(key as ConfigurationKeys) }),
					{}
				) as IConfigurationContext
		);
	}

	function getStoredConfigurationByKey<T>(key: keyof IConfigurationContext): T {
		const configuration = localStorage.getItem(userStorageKey);

		if (configuration) {
			const json = JSON.parse(configuration);
			return json[key] ?? defaultConfiguration[key];
		}

		return defaultConfiguration[key] as unknown as T;
	}

	function storeConfiguration(key: keyof IConfigurationContext, value: string | boolean): void {
		if (!currentUser) return;

		const configuration = localStorage.getItem(userStorageKey);

		if (configuration) {
			const userConfiguration = JSON.parse(configuration);
			localStorage.setItem(userStorageKey, JSON.stringify({ ...userConfiguration, [key]: value }));
			return;
		}

		localStorage.setItem(userStorageKey, JSON.stringify({ [key]: value }));
	}

	function toggleDarkTheme(): void {
		setConfiguration(prev => {
			const currentState = !prev.darkThemeActive;
			document.body.classList[currentState ? 'add' : 'remove']('dark-theme');
			storeConfiguration('darkThemeActive', currentState);
			return { ...prev, darkThemeActive: currentState };
		});
	}

	function generateThemeColorPalette(primaryColor: string, accentColor: string): void {
		[
			{ key: 'primary', color: primaryColor },
			{ key: 'accent', color: accentColor }
		].forEach(({ key, color }) => {
			const scale = generateColorScale(color);
			storeConfiguration(`${key}Color` as ConfigurationKeys, color);
			scale.forEach((color, i) => {
				const colorName = `--${key + (i > 0 ? `${i}00` : '')}`;
				document.documentElement.style.setProperty(colorName, color);
			});
		});
	}

	function setThemeColors(primaryColor?: string, accentColor?: string): void {
		setConfiguration(prev => {
			generateThemeColorPalette(primaryColor ?? prev.primaryColor, accentColor ?? prev.accentColor);
			return { ...prev, primaryColor: primaryColor ?? prev.primaryColor, accentColor: accentColor ?? prev.accentColor };
		});
	}

	useEffect(() => {
		getStoredConfiguration();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	useEffect(() => {
		generateThemeColorPalette(configuration.primaryColor, configuration.accentColor);
		document.body.classList[configuration.darkThemeActive ? 'add' : 'remove']('dark-theme');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [configuration]);

	return (
		<ConfigurationContext.Provider value={{ ...configuration, toggleDarkTheme, setThemeColors }}>{props.children}</ConfigurationContext.Provider>
	);
}

export function useConfigurationContext(): IConfigurationContextPayload {
	const context = useContext(ConfigurationContext);

	if (!Object.entries(context).length) {
		throw new Error('useConfigurationContext must be used within ConfigurationContext');
	}

	return context;
}
