import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsersContext } from '@app/contexts';
import { routes } from '@app/config';
import { IUser, TUserPayload } from '@app/models';
import Layout from '@app/components/Layout';
import { Spinner, Modal, Icon, Input, Button, useModal } from '@app/components/Shared';
import styles from './Users.module.scss';

export function Users(): JSX.Element {
	const { users, loading, setCurrentUser, createUser, updateUser, deleteUser } = useUsersContext();
	const { modalProps, openModal, closeModal } = useModal<{ user?: IUser }>();
	const navigate = useNavigate();

	function handleFormSubmit(e: FormEvent): void {
		e.preventDefault();

		const formData = new FormData(e.target as HTMLFormElement);
		const payload = Object.fromEntries(formData) as TUserPayload;

		if (modalProps?.user) {
			updateUser(modalProps.user.id, payload);
		} else {
			createUser(payload);
		}

		closeModal();
	}

	return (
		<Layout title="Users" className={styles.usersPage}>
			{loading && <Spinner className={styles.spinner} />}

			{!loading && users && (
				<ul className={styles.users}>
					{users.map(user => (
						<li
							key={user.name}
							className={styles.user}
							onClick={() => {
								setCurrentUser(user);
								navigate(routes.accounts.url);
							}}>
							<p className={styles.initials} data-initials={user.name[0]} />
							<p className={styles.name}>{user.name}</p>
							<div className={styles.userActions}>
								<button
									title="Edit user"
									onClick={e => {
										e.stopPropagation();
										openModal({ user });
									}}>
									<Icon name="pencil" size={16} />
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

			{/* Add/edit user modal */}
			{modalProps && (
				<Modal className={styles.modal} close={closeModal}>
					<h2>{modalProps?.user ? `Edit ${modalProps?.user.name}` : 'Add a new user'}</h2>

					<form onSubmit={handleFormSubmit}>
						<Input type="text" name="name" value={modalProps.user?.name} placeholder="Set the user's name" required />
						<Input type="email" name="email" value={modalProps.user?.email} placeholder="Set the user's email" required />
						<Input type="date" name="birthDate" value={modalProps.user?.birth_date} required />
						<Button type="submit">{`${modalProps?.user ? 'Edit' : 'Add'} user`}</Button>
					</form>
				</Modal>
			)}
		</Layout>
	);
}
