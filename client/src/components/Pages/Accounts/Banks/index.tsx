import { MouseEvent, FormEvent, useRef, useMemo, Fragment } from 'react';
import { useUsersContext, useAccountsContext } from '@app/contexts';
import { className } from '@app/shared/helpers';
import { currencyFormatter } from '@app/shared/constants';
import { useMovementsContext } from '@app/contexts';
import { IAccount, MovementType, TAccountPayload } from '@app/models';
import { Modal, Input, Button, useModal, Checkbox, Icon } from '@app/components/Shared';
import styles from './Banks.module.scss';

type TAccountsAccumulator = { [key: string]: IAccount[] };

// type TBalance = { [key: string]: any };

export function Banks(): JSX.Element {
	const { currentUser } = useUsersContext();
	const { movementsData } = useMovementsContext();
	const { accounts, createAccount, updateAccount, deleteAccount } = useAccountsContext();
	const { modalProps, openModal, closeModal } = useModal<{ account?: IAccount }>();
	const activeInputRef = useRef<HTMLInputElement>(null);
	const accountsMemo = useMemo(sectionAccounts, [accounts]);
	// const accountsBalance = useMemo(getAccountsBalance, [accounts]);

	// function getAccountsBalance(): TBalance {
	// 	return accounts.reduce((acc: TBalance, account) => {
	// 		return acc;
	// 	}, {});
	// }

	function getAccountBalance(account: IAccount): number {
		const { data } = movementsData;
		const accountMovementsBalance = data.reduce((acc, movement) => {
			if (movement.account_id === account.id) {
				acc += movement.amount * (movement.type === MovementType.Expense ? -1 : 1);
			}

			return acc;
		}, 0);

		return account.balance + accountMovementsBalance;
	}

	function sectionAccounts(): TAccountsAccumulator {
		return accounts.reduce((acc: TAccountsAccumulator, account) => {
			if (acc[account.type]) {
				acc[account.type].push(account);
			} else {
				acc[account.type] = [account];
			}

			return acc;
		}, {});
	}

	function handleAccountAction(type: 'edit' | 'delete', account: IAccount): (e: MouseEvent<HTMLButtonElement>) => void {
		return e => {
			e.stopPropagation();
			if (type === 'edit') openModal({ account });
			if (type === 'delete') deleteAccount(account.id);
		};
	}

	function handleFormSubmit(e: FormEvent): void {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const payload = Object.fromEntries(formData) as unknown as TAccountPayload;

		if (modalProps?.account) {
			updateAccount(modalProps.account.id, {
				...payload,
				user_id: currentUser!.id,
				active: !!activeInputRef.current?.checked
			});
		} else {
			createAccount({
				...payload,
				user_id: currentUser!.id,
				active: !!activeInputRef.current?.checked
			});
		}

		closeModal();
	}

	return (
		<>
			{accounts?.length === 0 && <h2 className="no-records-message">No accounts to list...</h2>}

			{accounts?.length > 0 && (
				<ul className={styles.accounts}>
					{/* <li className={styles.section}>Balance</li>

					<li className={styles.balance}></li> */}

					{Object.entries(accountsMemo).map(([section, sectionAccounts]) => (
						<Fragment key={section}>
							<li className={styles.section}>{section}</li>

							{sectionAccounts.map(account => (
								<li key={account.id} className={styles.account}>
									<div className={styles.accountDetail}>
										<p className={styles.accountName}>{account.name}</p>
										<span
											{...className(styles.accountBalance, {
												[styles.active]: account.active,
												[styles.negative]: getAccountBalance(account) < 0
											})}>
											{currencyFormatter.format(getAccountBalance(account))}
										</span>
									</div>

									<div className={styles.actions}>
										<Button onClick={handleAccountAction('edit', account)}>
											<Icon name="pencil" size={15} />
										</Button>

										<Button kind="negative" onClick={handleAccountAction('delete', account)}>
											<Icon name="trashCan" size={15} />
										</Button>
									</div>
								</li>
							))}
						</Fragment>
					))}
				</ul>
			)}

			<Button className="floating-action" title="Add account" onClick={() => openModal({})}>
				<Icon name="add" size={25} />
			</Button>

			{/* Add/edit user account */}
			{modalProps && (
				<Modal className="form-modal" close={closeModal}>
					<h2>{modalProps?.account ? `Edit ${modalProps?.account.name}` : 'Add a new account'}</h2>

					<form onSubmit={handleFormSubmit}>
						<Input name="name" value={modalProps.account?.name} placeholder="Set the account's name" required />

						<Input type="number" name="balance" value={modalProps.account?.balance} placeholder="Set the account's balance" required />

						<Input
							name="currency"
							value={modalProps.account?.currency}
							autoSuggestions={{
								currencyTypes: Object.values(accounts).reduce(
									(acc: string[], x) => (acc.includes(x.currency) ? acc : [...acc, x.currency]),
									[]
								)
							}}
							placeholder="Set the account's currency"
							required
						/>

						<Input
							name="type"
							value={modalProps.account?.type}
							autoSuggestions={{ accounts: Object.keys(accountsMemo) }}
							placeholder="Set the account's type"
							required
						/>

						{/* <textarea name="note" value={modalProps.account?.note} placeholder="Set a note (optional)" /> */}
						<Checkbox ref={activeInputRef} name="active" label="Active account" checked={modalProps.account?.active} />

						<Button type="submit">{`${modalProps?.account ? 'Edit' : 'Add'} account`}</Button>
					</form>
				</Modal>
			)}
		</>
	);
}
