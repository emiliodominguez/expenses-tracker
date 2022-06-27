import { FormEvent, useState, ChangeEvent } from 'react';
import { useUsersContext, useAccountsContext } from '@app/contexts';
import { getCardBrand } from '@app/shared/helpers';
import { ICard, TCardPayload } from '@app/models';
import { Spinner, Modal, Input, Button, useModal, Icon, Card, TCardData } from '@app/components/Shared';
import styles from './Cards.module.scss';

export function Cards(): JSX.Element {
	const { currentUser } = useUsersContext();
	const {
		cardsData: { data: cards, loading },
		createCard,
		updateCard,
		deleteCard
	} = useAccountsContext();
	const { modalProps, openModal, closeModal } = useModal<{ card?: ICard }>();
	const [modalCardData, setModalCardData] = useState<TCardData | null>(null);

	function setCardNumber(e: ChangeEvent<HTMLInputElement>): void {
		setModalCardData(prev => ({ ...prev, cardNumber: +e.target.value } as TCardData));
	}

	function getCardExpirationDate(date: string | Date): { month: string; year: string } {
		const parsedDate = new Date(date);

		return {
			month: String(parsedDate.getMonth() + 1).padStart(2, '0'),
			year: String(parsedDate.getFullYear()).substring(2)
		};
	}

	function setCardExpirationDate(e: ChangeEvent<HTMLInputElement>): void {
		const { month, year } = getCardExpirationDate(e.target.value);
		setModalCardData(prev => ({ ...(prev ?? {}), expirationDateMonth: month, expirationDateYear: year } as TCardData));
	}

	function handleFormSubmit(e: FormEvent): void {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const formPayload = Object.fromEntries(formData) as unknown as TCardPayload;
		const payload = {
			...formPayload,
			number: +formPayload.number,
			user_id: currentUser!.id,
			brand: getCardBrand(modalCardData?.cardNumber)?.name ?? ''
		};

		if (modalProps?.card) {
			updateCard(modalProps.card.id, payload);
		} else {
			createCard(payload);
		}

		closeModal();
		setModalCardData(null);
	}

	return (
		<>
			{loading && <Spinner className={styles.spinner} />}

			{!loading && cards?.length === 0 && <h2 className="no-records-message">No cards to list...</h2>}

			{!loading && cards?.length > 0 && (
				<div className={styles.cards}>
					{cards.map(card => {
						const { month, year } = getCardExpirationDate(card.expiration_date);
						return (
							<Card
								key={card.number}
								className={styles.card}
								cardNumber={card.number}
								expirationDateMonth={month}
								expirationDateYear={year}
								onEdit={() => {
									const { month: expirationDateMonth, year: expirationDateYear } = getCardExpirationDate(card.expiration_date);
									setModalCardData({ cardNumber: card.number, expirationDateMonth, expirationDateYear });
									openModal({ card });
								}}
								onDelete={() => deleteCard(card.id)}
							/>
						);
					})}
				</div>
			)}

			<Button className="floating-action" title="Add card" onClick={() => openModal({})}>
				<Icon name="add" size={25} />
			</Button>

			{/* Add/edit user card */}
			{modalProps && (
				<Modal
					className="form-modal"
					close={() => {
						closeModal();
						setModalCardData(null);
					}}>
					<h2>{modalProps?.card ? 'Edit' : 'Add'} card</h2>

					{modalCardData && <Card className={styles.card} {...modalCardData} />}

					<form onSubmit={handleFormSubmit}>
						<Input
							type="text"
							name="number"
							maxLength={16}
							value={modalCardData?.cardNumber}
							placeholder="Set the card's number"
							onChange={setCardNumber}
							required
						/>

						<Input name="bank" value={modalProps.card?.bank} placeholder="Set the card's bank" required />

						<select name="type" defaultValue={modalProps.card?.type}>
							<option hidden>Select the card type</option>

							{['Debit', 'Credit'].map(type => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>

						<Input
							type="date"
							name="expiration_date"
							value={modalProps.card?.expiration_date}
							onChange={setCardExpirationDate}
							required
						/>

						<Button type="submit">{`${modalProps?.card ? 'Edit' : 'Add'} card`}</Button>
					</form>
				</Modal>
			)}
		</>
	);
}
