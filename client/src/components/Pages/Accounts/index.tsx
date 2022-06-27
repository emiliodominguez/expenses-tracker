import { MouseEvent, FormEvent, useRef, useMemo, Fragment } from 'react';
import Layout from '@app/components/Layout';
import { useUsersContext, useAccountsContext } from '@app/contexts';
import { IAccount, TAccountPayload } from '@app/models';
import { Spinner, Modal, Input, Button, useModal, Checkbox, Icon } from '@app/components/Shared';
import styles from './Accounts.module.scss';

type TAccountsAccumulator = { [key: string]: IAccount[] };

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function Accounts(): JSX.Element {
	const { currentUser } = useUsersContext();
	const { accounts, loading, createAccount, updateAccount, deleteAccount } = useAccountsContext();
	const { modalProps, openModal, closeModal } = useModal<{ account?: IAccount }>();
	const activeInputRef = useRef<HTMLInputElement>(null);
	const accountsMemo = useMemo(sectionAccounts, [accounts]);

	function sectionAccounts() {
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
			updateAccount(modalProps.account.id, { ...payload, active: !!activeInputRef.current?.checked });
		} else {
			createAccount({ ...payload, active: !!activeInputRef.current?.checked });
		}

		closeModal();
	}

	console.log(accountsMemo);

	return (
		<Layout title="Accounts" className={styles.accountsPage}>
			{loading && <Spinner className={styles.spinner} />}

			{!loading && accounts?.length === 0 && <h2 className="no-records-message">No accounts to list...</h2>}

			{!loading && accounts?.length > 0 && (
				<ul className={styles.accounts}>
					{Object.entries(accountsMemo).map(([section, sectionAccounts]) => (
						<Fragment key={section}>
							<li className={styles.section}>{section}</li>

							{sectionAccounts.map(account => (
								<li key={account.id} className={styles.account}>
									<p className={styles.detail}>
										<b>{account.name}</b>
										<span className={styles.balance}>{currencyFormatter.format(account.balance)}</span>
									</p>

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
				<Modal className={styles.modal} close={closeModal}>
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
							autoSuggestions={{ accountTypes: Object.keys(accountsMemo) }}
							placeholder="Set the account's type"
							required
						/>
						{/* <textarea name="note" value={modalProps.account?.note} placeholder="Set a note (optional)" /> */}
						<Checkbox ref={activeInputRef} name="active" label="Active account" checked={modalProps.account?.active} />
						<Input type="hidden" min={0} value={currentUser?.id} name="user_id" readOnly />
						<Button type="submit">{`${modalProps?.account ? 'Edit' : 'Add'} account`}</Button>
					</form>
				</Modal>
			)}
		</Layout>
	);
}
