import { FormEvent } from 'react';
import { useUsersContext } from '@app/contexts';
import Layout from '@app/components/Layout';
import { Spinner, Modal, Icon, Input, Button, useModal } from '@app/components/Shared';
import { IUser } from '@app/models';
import styles from './Users.module.scss';

export function Users(): JSX.Element {
	const { users, loading, setCurrentUser, createUser, updateUser, deleteUser } = useUsersContext();
	const { modalProps, openModal, closeModal } = useModal<{ user?: IUser }>();

	function handleFormSubmit(e: FormEvent): void {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		if (![...formData.values()].some(Boolean)) return;

		const payload = {
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			birth_date: formData.get('birthDate') as string
		};

		if (modalProps?.user) {
			updateUser(modalProps.user.id, payload);
		} else {
			createUser(payload);
		}

		closeModal();
	}

	return (
		<Layout className={styles.usersPage}>
			{loading && <Spinner className={styles.spinner} />}

			{!loading && users && (
				<ul className={styles.users}>
					{users.map(user => (
						<li key={user.name} className={styles.user} onClick={() => setCurrentUser(user)}>
							<p className={styles.initials} data-initials={user.name[0]} />
							<p className={styles.name}>{user.name}</p>
							<div className={styles.userActions}>
								<button
									title="Edit user"
									onClick={e => {
										e.stopPropagation();
										openModal({ user });
									}}>
									<Icon name="pencil" size={20} />
								</button>

								<button
									title="Delete user"
									onClick={e => {
										e.stopPropagation();
										deleteUser(user.id);
									}}>
									<Icon name="trashCan" size={16} />
								</button>
							</div>
						</li>
					))}

					<li title="Add new user" className={styles.addUserBtn} onClick={() => openModal({})}>
						<Icon name="add" size={40} />
					</li>
				</ul>
			)}

			{/* Add user modal */}
			{modalProps && (
				<Modal className={styles.addUserModal} close={closeModal}>
					<h2>{modalProps?.user ? `Edit ${modalProps?.user.name}` : 'Add a new user'}</h2>

					<form onSubmit={handleFormSubmit}>
						<Input type="text" name="name" value={modalProps.user?.name} placeholder="Set the user's name" />
						<Input type="email" name="email" value={modalProps.user?.email} placeholder="Set the user's email" />
						<Input type="date" name="birthDate" value={modalProps.user?.birth_date} />
						<Button type="submit">{`${modalProps?.user ? 'Edit' : 'Add'} user`}</Button>
					</form>
				</Modal>
			)}
		</Layout>
	);
}
