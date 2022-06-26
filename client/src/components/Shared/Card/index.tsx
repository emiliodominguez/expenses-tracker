import { useMemo, useRef } from 'react';
import { className, getCardBrand } from '@app/shared/helpers';
import styles from './Card.module.scss';
import useEventListener from '@app/hooks/useEventListener';

interface ICardProps {
	cardNumber?: number;
	expirationDateMonth?: number;
	expirationDateYear?: number;
	className?: string;
}

export function Card(props: ICardProps): JSX.Element {
	const cardRef = useRef<HTMLDivElement>(null);
	const brandMemo = useMemo(() => getCardBrand(props.cardNumber), [props.cardNumber]);

	function separateCardNumbers(number?: number): string {
		if (!number) return '';
		return number.toString().replace(/(\d{4}(?!\s))/g, '$1 ');
	}

	function handlePointerMove(e: PointerEvent): void {
		if (!cardRef.current) return;

		const card = cardRef.current;
		const cardRect = card.getBoundingClientRect();
		const mouseX = e.clientX - cardRect.left;
		const mouseY = e.clientY - cardRect.top;
		card.style.setProperty('--mouse-position-x', `${(mouseX / card.clientWidth) * 100}%`);
		card.style.setProperty('--mouse-position-y', `${(mouseY / card.clientHeight) * 100}%`);
	}

	useEventListener('pointermove', handlePointerMove);

	return (
		<div ref={cardRef} {...className(styles.card, props.className)}>
			<img className={styles.map} src="/assets/img/map.png" alt="Map" />

			{brandMemo && <img className={styles.logo} src={`/assets/cards/${brandMemo?.asset}`} alt={`${brandMemo?.name} logo`} />}

			<div className={styles.content}>
				<p className={styles.number}>{separateCardNumbers(props.cardNumber)}</p>

				<p {...className(styles.expirationDate, { [styles.noDate]: !props.expirationDateMonth && !props.expirationDateYear })}>
					{props.expirationDateMonth || '00'}
					<span className={styles.separator}>/</span>
					{props.expirationDateYear || '00'}
				</p>
			</div>
		</div>
	);
}
