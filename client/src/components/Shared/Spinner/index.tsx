import { className } from '@app/shared/helpers';
import { MappedStyles } from '@app/styles/interfaces/mapped-styles';
import styles from './Spinner.module.scss';

export interface ISpinnerProps {
	size?: number;
	borderSize?: number;
	baseColor?: string;
	highlightColor?: string;
	className?: string;
}

/**
 * The spinner component
 */
export function Spinner(props: ISpinnerProps): JSX.Element {
	return (
		<span
			{...className(styles.spinner, props.className)}
			data-testid="ui-spinner"
			style={
				{
					'--spinner-size': props.size && `${props.size}px`,
					'--spinner-border-size': props.borderSize && `${props.borderSize}px`,
					'--spinner-base-color': props.baseColor,
					'--spinner-highlight-color': props.highlightColor
				} as MappedStyles
			}
		/>
	);
}
