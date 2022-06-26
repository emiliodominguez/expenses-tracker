import { ChangeEvent, InputHTMLAttributes, useRef, useState } from 'react';
import { className, maskInput } from '@app/shared/helpers';
import { Icon } from '../Icon';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	clearable?: boolean;
	mask?: string;
	setError?: (error: string) => void;
}

/**
 * Input for text, email, mobile number, security number, birth
 */
export function Input(props: InputProps): JSX.Element {
	const [inputText, setInputText] = useState<string>(String(props.value ?? ''));
	const inputRef = useRef<HTMLInputElement>(null);

	/**
	 * Filters input props
	 */
	function getInputProps(): InputHTMLAttributes<HTMLInputElement> {
		const notInputProps = ['error', 'mask', 'clearable', 'setError'];
		const inputPropsKeys = Object.keys(props).filter(key => !notInputProps.includes(key));
		return inputPropsKeys.reduce((acc, key) => ({ ...acc, [key]: (props as { [key: string]: any })[key] }), {});
	}

	/**
	 * Handles the change event
	 */
	function handleChange(e: ChangeEvent<HTMLInputElement>): void {
		setInputText(prev => {
			if (props.mask) {
				const isDeleting = prev?.toString?.().length > e.target.value.toString().length;
				return isDeleting ? e.target.value : maskInput(e.target.value.toString(), props.mask);
			} else {
				return e.target.value;
			}
		});

		props.onChange?.(e);
	}

	/**
	 * Clears the input
	 */
	function clearInput(): void {
		setInputText('');
		const event = new Event('change');
		inputRef.current?.dispatchEvent(event);
	}

	return (
		<>
			<div {...className(styles.inputContainer, props.className)}>
				<input {...getInputProps()} ref={inputRef} value={inputText} type={props.type ?? 'text'} onChange={handleChange} />

				{props.clearable && inputText && (
					<button className={styles.clear} onClick={clearInput}>
						<Icon name="clear" />
					</button>
				)}
			</div>

			{props.error && <p className={styles.error}>{props.error}</p>}
		</>
	);
}
