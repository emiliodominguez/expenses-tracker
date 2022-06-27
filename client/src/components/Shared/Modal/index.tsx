import { PropsWithChildren, useState, useRef, MouseEvent } from 'react';
import { className } from '@app/shared/helpers';
import { Icon } from '../Icon';
import styles from './Modal.module.scss';

interface IModalProps {
	className?: string;
	close: () => void;
}

interface IUseModalPayload<T> {
	modalProps: T | null;
	openModal: (props: T) => void;
	closeModal: () => void;
}

/**
 * The modal component
 */
export function Modal(props: PropsWithChildren<IModalProps>): JSX.Element {
	const contentRef = useRef<HTMLDivElement>(null);

	/**
	 * Handles the click event outside the content
	 */
	function handleClickOutsideContent(e: MouseEvent<HTMLElement>): void {
		if (!contentRef.current?.contains(e.target as HTMLElement)) {
			props.close();
		}
	}

	return (
		<div {...className(styles.modal, props.className)} onPointerDown={handleClickOutsideContent}>
			<div ref={contentRef} className={styles.content}>
				<button className={styles.closeBtn} onClick={props.close}>
					<Icon name="close" size={12} />
				</button>

				{props.children}
			</div>
		</div>
	);
}

/**
 * A hook to expose Modal configuration
 */
export function useModal<T extends Omit<IModalProps, 'className' | 'close'>>(): IUseModalPayload<T> {
	const [modalProps, setModalProps] = useState<T | null>(null);

	return {
		modalProps,
		openModal: props => setModalProps(props),
		closeModal: () => setModalProps(null)
	};
}
