import { InputHTMLAttributes } from 'react';
// import styles from './Select.module.scss';

interface ISelectOption {
	label: string;
	value?: string | number;
}

interface ISelectProps extends InputHTMLAttributes<HTMLSelectElement> {
	placeholder?: string;
	options: ISelectOption[];
}

export function Select(props: ISelectProps): JSX.Element {
	return (
		<select name={props.name} defaultValue={props.defaultValue} value={props.value} onChange={props.onChange}>
			<option hidden>{props.placeholder}</option>

			{props.options.length === 0 && <option disabled>No elements to list</option>}

			{props.options.length > 0 &&
				props.options.map((option, i) => (
					<option key={`${props.name}_${option.label}_${i}`} value={option.value ?? option.label}>
						{option.label}
					</option>
				))}
		</select>
	);
}
