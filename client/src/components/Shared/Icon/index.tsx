import { className } from '@app/shared/helpers';
import { icons, TIcon } from '@app/shared/icons';
import { MappedStyles } from '@app/styles/interfaces/mapped-styles';
import styles from './Icon.module.scss';

interface IIconProps {
	name: TIcon;
	title?: string;
	size?: number;
	color?: string;
	className?: string;
}

/**
 * The Icon component
 */
export function Icon(props: IIconProps): JSX.Element {
	if (!icons.hasOwnProperty(props.name)) return <></>;

	return (
		<span
			role="img"
			aria-label={props.title}
			title={props.title}
			style={
				{
					'--icon-size': props.size && `${props.size}px`,
					'--icon-color': props.color
				} as MappedStyles
			}
			{...className(styles.icon, props.className, {
				[styles.colored]: !!props.color
			})}>
			{icons[props.name]}
		</span>
	);
}
