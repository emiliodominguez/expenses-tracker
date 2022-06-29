import { FormEvent, useState } from 'react';
import Layout from '@app/components/Layout';
import { className } from '@app/shared/helpers';
import { currencyFormatter } from '@app/shared/constants';
import { Spinner, Button, useModal, Modal, Icon, Input, Select } from '@app/components/Shared';
import { useAccountsContext, useMovementsContext, useUsersContext } from '@app/contexts';
import { useCalendar } from '@app/hooks';
import { IMovement, TMovementPayload } from '@app/models';
import styles from './Movements.module.scss';

enum MovementType {
	Expense = 'Expense',
	Income = 'Income'
}

const minYear = 2022;
const increaseYears = 50;
const yearsSelect = Array.from({ length: new Date().getFullYear() - minYear + increaseYears + 1 }, (v, i) => i + minYear);

export function Movements(): JSX.Element {
	const { currentUser } = useUsersContext();
	const { accounts } = useAccountsContext();
	const {
		movementsData: { data: movements, loading },
		createMovement,
		updateMovement,
		deleteMovement
	} = useMovementsContext();
	const { modalProps, openModal, closeModal } = useModal<{ movement?: IMovement; editMode?: boolean }>();
	const calendar = useCalendar();
	const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

	function handleFormSubmit(e: FormEvent): void {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const payload = Object.fromEntries(formData) as unknown as TMovementPayload;

		if (modalProps?.editMode) {
			updateMovement(modalProps.movement!.id, { ...payload, user_id: currentUser!.id, account_id: +payload.account_id });
		} else {
			createMovement({ ...payload, user_id: currentUser!.id, account_id: +payload.account_id });
		}

		closeModal();
	}

	return (
		<Layout title="Movements">
			{loading && <Spinner />}

			{!loading && (
				<div className={styles.calendar}>
					<div className={styles.dateSelection}>
						<Select
							value={calendar.currentMonth}
							options={calendar.months.map((month, i) => ({ label: month, value: i }))}
							onChange={e => calendar.goToMonth(+e.target.value)}
						/>

						<Select
							value={calendar.currentYear}
							options={yearsSelect.map(x => ({ label: x.toString() }))}
							onChange={e => calendar.goToYear(+e.target.value)}
						/>

						<Button onClick={calendar.restoreDate} disabled={calendar.checkIfCurrentMonthAndYear()}>
							Go to today
						</Button>
					</div>

					<ul className={styles.weekDays}>
						{calendar.weekDays.map(day => (
							<li key={day} className={styles.day}>
								{day}
							</li>
						))}
					</ul>

					<ul className={styles.monthDays}>
						{[...Array(calendar.monthDays).keys()].map(day => {
							const realDay = day + 1;

							return (
								<li
									key={day}
									{...className(styles.day, { [styles.current]: calendar.checkIfToday(realDay) })}
									style={{ gridColumn: day === 0 ? calendar.monthFirstDay : undefined }}
									onClick={() =>
										openModal({
											movement: {
												date: new Date(calendar.currentYear, calendar.currentMonth + 1, realDay).toISOString().slice(0, 10)
											} as IMovement
										})
									}>
									<span className={styles.dayBadge}>{realDay}</span>
									<div className={styles.movements}>
										{movements.map(
											movement =>
												calendar.checkIfToday(realDay) && (
													<button
														key={movement.id}
														onClick={e => {
															e.stopPropagation();
															openModal({ movement, editMode: true });
														}}
														{...className({
															[styles.expense]: movement.type === MovementType.Expense,
															[styles.income]: movement.type === MovementType.Income
														})}>
														{currencyFormatter.format(movement.amount)}
													</button>
												)
										)}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			)}

			<Button className="floating-action" title="Add movement" onClick={() => openModal({})}>
				<Icon name="add" size={25} />
			</Button>

			{/* Add/edit user movement */}
			{modalProps && (
				<Modal className="form-modal" close={closeModal}>
					<h2>{modalProps?.editMode ? 'Edit' : 'Add'} movement</h2>

					<form onSubmit={handleFormSubmit}>
						<Input type="number" name="amount" placeholder="Set the movement amount" value={modalProps.movement?.amount} required />

						<Select
							name="currency"
							defaultValue={modalProps.movement?.currency}
							placeholder="Select the currency"
							onChange={e => setSelectedCurrency(e.target.value)}
							options={Object.values(accounts)
								.reduce((acc: string[], x) => (acc.includes(x.currency) ? acc : [...acc, x.currency]), [])
								.map(currency => ({ label: currency }))}
						/>

						<Select
							name="type"
							defaultValue={modalProps.movement?.type}
							placeholder="Select the movement type"
							options={[{ label: MovementType.Expense }, { label: MovementType.Income }]}
						/>

						<Select
							name="account_id"
							defaultValue={modalProps.movement?.account_id}
							placeholder="Select the account"
							options={accounts
								.filter(account => account.active && (selectedCurrency ? account.currency === selectedCurrency : account))
								.map(account => ({ label: account.name, value: account.id.toString() }))}
						/>

						<Input type="date" name="date" value={modalProps.movement?.date} required />

						<Button type="submit">{`${modalProps?.editMode ? 'Edit' : 'Add'} movement`}</Button>

						{modalProps.editMode && (
							<Button kind="negative" className={styles.deleteBtn} onClick={() => deleteMovement(modalProps.movement!.id)}>
								Delete movement
							</Button>
						)}
					</form>
				</Modal>
			)}
		</Layout>
	);
}
