import { FormEvent, useRef } from 'react';
import Layout from '@app/components/Layout';
import { useUsersContext, useAccountsContext } from '@app/contexts';
import { IAccount, TAccountPayload } from '@app/models';
import { Spinner, Modal, Input, Button, useModal, Checkbox, Icon } from '@app/components/Shared';
import styles from './Accounts.module.scss';

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function Accounts(): JSX.Element {
	const { currentUser } = useUsersContext();
	const { accounts, loading, createAccount, updateAccount, deleteAccount } = useAccountsContext();
	const { modalProps, openModal, closeModal } = useModal<{ account?: IAccount }>();
	const activeInputRef = useRef<HTMLInputElement>(null);

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

	return (
		<Layout title="Accounts" className={styles.accountsPage}>
			{loading && <Spinner className={styles.spinner} />}

			{!loading && accounts?.length === 0 && <h2 className={styles.noRecordsMessage}>No accounts to list...</h2>}

			{!loading && accounts?.length > 0 && (
				<>
					<ul className={styles.accounts}>
						<li className={styles.addAccountBtn}>
							<Button title="Add account" onClick={() => openModal({})}>
								<Icon name="add" size={25} />
							</Button>
						</li>

						{accounts.map(account => (
							<li key={account.id} className={styles.account}>
								<p className={styles.detail}>
									<b>{account.name}</b>
									<span className={styles.balance}>{currencyFormatter.format(account.balance)}</span>
								</p>

								<div className={styles.actions}>
									<Button
										onClick={e => {
											e.stopPropagation();
											openModal({ account });
										}}>
										<Icon name="pencil" />
									</Button>

									<Button
										kind="negative"
										onClick={e => {
											e.stopPropagation();
											deleteAccount(account.id);
										}}>
										<Icon name="trashCan" />
									</Button>
								</div>
							</li>
						))}
					</ul>
				</>
			)}

			{/* Add/edit user account */}
			{modalProps && (
				<Modal className={styles.modal} close={closeModal}>
					<h2>{modalProps?.account ? `Edit ${modalProps?.account.name}` : 'Add a new account'}</h2>

					<form onSubmit={handleFormSubmit}>
						<Input type="text" name="name" value={modalProps.account?.name} placeholder="Set the account's name" required />
						<Input type="number" name="balance" value={modalProps.account?.balance} placeholder="Set the account's balance" required />
						<Input type="text" name="currency" value={modalProps.account?.currency} placeholder="Set the account's currency" required />
						<Input type="text" name="type" value={modalProps.account?.type} placeholder="Set the account's type" required />
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
