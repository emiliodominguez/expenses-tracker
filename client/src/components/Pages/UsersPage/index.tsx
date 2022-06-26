import { FormEvent } from 'react';
import { useUsersContext } from '@app/contexts';
import Layout from '@app/components/Layout';
import { Spinner, Modal, Icon, Input, Button, useModal } from '@app/components/Shared';
import styles from './UsersPage.module.scss';

export default function UsersPage(): JSX.Element {
	const { users, loading, setCurrentUser, createUser } = useUsersContext();
	const { modalProps, openModal, closeModal } = useModal();

	function handleFormSubmit(e: FormEvent): void {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);

		if (![...formData.values()].some(Boolean)) return;

		createUser({
			name: formData.get('name') as string,
			email: formData.get('email') as string,
			birth_date: formData.get('birthDate') as string
		});

		closeModal();
	}

	return (
		<Layout className={styles.usersPage}>
			{loading && <Spinner className={styles.spinner} />}

			{!loading && users && (
				<div className={styles.users}>
					{users.map(user => (
						<button key={user.name} onClick={() => setCurrentUser(user)}>
							<p className={styles.initials} data-initials={user.name[0]} />
							{user.name}
						</button>
					))}

					<button title="Add new user" className={styles.addUserBtn} onClick={() => openModal({})}>
						<Icon name="add" size={40} />
					</button>
				</div>
			)}

			{/* Add user modal */}
			{modalProps && (
				<Modal className={styles.addUserModal} close={closeModal}>
					<h2>Add a new user</h2>

					<form onSubmit={handleFormSubmit}>
						<Input type="text" name="name" placeholder="Set the user's name" />
						<Input type="email" name="email" placeholder="Set the user's email" />
						<Input type="date" name="birthDate" />
						<Button type="submit">Add user</Button>
					</form>
				</Modal>
			)}
		</Layout>
	);
}
