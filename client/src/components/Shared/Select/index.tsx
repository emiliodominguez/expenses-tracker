import { InputHTMLAttributes } from 'react';
// import styles from './Select.module.scss';

interface ISelectOption {
	label: string;
	value?: string;
}

interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement> {
	placeholder?: string;
	options: ISelectOption[];
}

export function Select(props: ISelectProps): JSX.Element {
	return (
		<select name={props.name} defaultValue={props.defaultValue} onChange={props.onChange}>
			<option hidden>{props.placeholder}</option>

			{props.options.map((option, i) => (
				<option key={`${props.name}_${option.label}_${i}`} value={option.value ?? option.label}>
					{option.label}
				</option>
			))}
		</select>
	);
}
