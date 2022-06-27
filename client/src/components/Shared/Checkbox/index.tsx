import { className } from '@app/shared/helpers';
import { ChangeEvent, forwardRef, useState } from 'react';
import { Icon } from '../Icon';
import styles from './Checkbox.module.scss';

interface ICheckboxProps {
	checked?: boolean;
	label?: string;
	name?: string;
	className?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, ICheckboxProps>((props, ref): JSX.Element => {
	const [checked, setChecked] = useState<boolean>(!!props.checked);

	return (
		<label {...className(styles.checkbox, props.className)}>
			<span className={styles.icon}>
				<input
					ref={ref}
					type="checkbox"
					name={props.name}
					checked={checked}
					onChange={e => {
						setChecked(e.target.checked);
						props.onChange?.(e);
					}}
				/>

				<Icon name={checked ? 'checked' : 'unchecked'} size={18} />
			</span>
			{props.label}
		</label>
	);
});
