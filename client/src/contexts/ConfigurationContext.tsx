import { generateColorScale } from '@app/shared/helpers';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

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

enum LsKeys {
	DarkTheme = 'DarkThemeActive',
	PrimaryColor = 'PrimaryColor',
	AccentColor = 'AccentColor'
}

export function ConfigurationContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const [configuration, setConfiguration] = useState<IConfigurationContext>({
		darkThemeActive: JSON.parse(localStorage.getItem(LsKeys.DarkTheme) ?? 'true'),
		primaryColor: localStorage.getItem(LsKeys.PrimaryColor) ?? '#6e62c2',
		accentColor: localStorage.getItem(LsKeys.AccentColor) ?? '#4062bb'
	});

	function toggleDarkTheme(): void {
		setConfiguration(prev => {
			const currentState = !prev.darkThemeActive;
			localStorage.setItem(LsKeys.DarkTheme, JSON.stringify(currentState));
			return { ...prev, darkThemeActive: currentState };
		});
	}

	function generateThemeColorPalette(primaryColor: string, accentColor: string): void {
		[
			{ key: 'primary', lsKey: LsKeys.PrimaryColor, color: primaryColor },
			{ key: 'accent', lsKey: LsKeys.AccentColor, color: accentColor }
		].forEach(({ key, lsKey, color }) => {
			const scale = generateColorScale(color);
			localStorage.setItem(lsKey, color);
			scale.forEach((color, i) => {
				const colorName = `--${key + (i > 0 ? `${i}00` : '')}`;
				document.documentElement.style.setProperty(colorName, color);
			});
		});
	}

	function setThemeColors(primaryColor?: string, accentColor?: string): void {
		setConfiguration(prev => ({ ...prev, primaryColor: primaryColor ?? prev.primaryColor, accentColor: accentColor ?? prev.primaryColor }));
	}

	useEffect(() => {
		document.body.classList[configuration.darkThemeActive ? 'add' : 'remove']('dark-theme');
	}, [configuration.darkThemeActive]);

	useEffect(() => {
		generateThemeColorPalette(configuration.primaryColor, configuration.accentColor);
	}, [configuration.primaryColor, configuration.accentColor]);

	return (
		<ConfigurationContext.Provider
			value={{
				...configuration,
				toggleDarkTheme,
				setThemeColors
			}}>
			{props.children}
		</ConfigurationContext.Provider>
	);
}

export function useConfigurationContext(): IConfigurationContextPayload {
	const context = useContext(ConfigurationContext);

	if (!Object.entries(context).length) {
		throw new Error('useConfigurationContext must be used within ConfigurationContext');
	}

	return context;
}
