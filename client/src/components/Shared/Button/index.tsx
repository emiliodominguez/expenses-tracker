import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { className } from '@app/shared/helpers';
import { Spinner, ISpinnerProps } from '../Spinner';
import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	kind?: 'primary' | 'secondary';
	loading?: boolean;
	spinnerProps?: ISpinnerProps;
}

/**
 * The button component
 */
export function Button(props: PropsWithChildren<IButtonProps>): JSX.Element {
	/**
	 * Filters button props
	 */
	function getButtonProps(): ButtonHTMLAttributes<HTMLButtonElement> {
		const notButtonProps = ['kind', 'loading', 'spinnerProps'];
		const buttonPropsKeys = Object.keys(props).filter(key => !notButtonProps.includes(key));
		return buttonPropsKeys.reduce((acc, key) => ({ ...acc, [key]: (props as { [key: string]: any })[key] }), {});
	}

	return (
		<button
			{...getButtonProps()}
			disabled={props.disabled ?? props.loading}
			data-testid={(props as any)['data-testid'] ?? 'ui-button'}
			{...className(styles.button, styles[props.kind ?? 'primary'], props.className)}>
			{props.loading ? (
				<Spinner {...props.spinnerProps} size={props.spinnerProps?.size ?? 15} borderSize={props.spinnerProps?.borderSize ?? 2} />
			) : (
				props.children
			)}
		</button>
	);
}
