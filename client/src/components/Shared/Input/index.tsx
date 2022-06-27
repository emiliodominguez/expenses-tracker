import { ChangeEvent, forwardRef, InputHTMLAttributes, useMemo, useState } from 'react';
import { className } from '@app/shared/helpers';
import { Icon } from '../Icon';
import styles from './Input.module.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	clearable?: boolean;
	autoSuggestions?: { [key: string]: string[] };
	setError?: (error: string) => void;
}

/**
 * Input for text, email, mobile number, security number, birth
 */
export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref): JSX.Element => {
	const [inputText, setInputText] = useState<string>(String(props.value ?? ''));
	const autoSuggestionsKey = useMemo(() => Object.keys(props.autoSuggestions ?? {})[0], [props.autoSuggestions]);

	/**
	 * Filters input props
	 */
	function getInputProps(): InputHTMLAttributes<HTMLInputElement> {
		const notInputProps = ['error', 'clearable', 'setError', 'autoSuggestions'];
		const inputPropsKeys = Object.keys(props).filter(key => !notInputProps.includes(key));
		return inputPropsKeys.reduce((acc, key) => ({ ...acc, [key]: (props as { [key: string]: any })[key] }), {});
	}

	/**
	 * Handles the change event
	 */
	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		setInputText(e.target.value);
		props.onChange?.(e);
	}

	/**
	 * Clears the input
	 */
	function clearInput(): void {
		setInputText('');
	}

	return (
		<>
			<div {...className(styles.inputContainer, props.className)}>
				<input
					{...getInputProps()}
					ref={ref}
					value={inputText}
					list={autoSuggestionsKey}
					type={props.type ?? 'text'}
					autoComplete={props.autoComplete ?? 'off'}
					onChange={handleChange}
				/>

				{props.autoSuggestions && (
					<datalist id={autoSuggestionsKey}>
						{props.autoSuggestions[autoSuggestionsKey].map(section => (
							<option key={section} value={section}>
								{section}
							</option>
						))}
					</datalist>
				)}

				{props.clearable && inputText && (
					<button className={styles.clear} onClick={clearInput}>
						<Icon name="clear" />
					</button>
				)}
			</div>

			{props.error && <p className={styles.error}>{props.error}</p>}
		</>
	);
});

Input.displayName = 'Input';
