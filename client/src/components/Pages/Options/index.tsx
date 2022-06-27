import { ChangeEvent } from 'react';
import { useConfigurationContext } from '@app/contexts';
import Layout from '@app/components/Layout';
import styles from './Options.module.scss';
import { Checkbox } from '@app/components/Shared';

export function Options(): JSX.Element {
	const { darkThemeActive, primaryColor, accentColor, setThemeColors, toggleDarkTheme } = useConfigurationContext();

	function setThemeColor(e: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = e.target;
		const primary = name === 'primary' ? value : undefined;
		const accent = name === 'accent' ? value : undefined;
		setThemeColors(primary, accent);
	}

	return (
		<Layout title="Options">
			<div className={styles.wrapper}>
				<label className={styles.colorPicker} htmlFor="primary">
					<input type="color" name="primary" value={primaryColor} onChange={setThemeColor} />
					Primary theme color
				</label>

				<label className={styles.colorPicker} htmlFor="accent">
					<input type="color" name="accent" value={accentColor} onChange={setThemeColor} />
					Accent theme color
				</label>

				<Checkbox
					key={`${darkThemeActive ? 'Dark' : 'Light'} theme`}
					label={`Dark theme ${darkThemeActive ? 'active' : 'inactive'}`}
					checked={darkThemeActive}
					onChange={toggleDarkTheme}
				/>
			</div>
		</Layout>
	);
}
