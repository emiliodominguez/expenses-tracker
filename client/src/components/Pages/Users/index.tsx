import { FormEvent, MouseEvent } from 'react';
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

	function handleAccountAction(type: 'edit' | 'delete', user: IUser): (e: MouseEvent<HTMLButtonElement>) => void {
		return e => {
			e.stopPropagation();
			if (type === 'edit') openModal({ user });
			if (type === 'delete') deleteUser(user.id);
		};
	}

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
		<Layout title="Users">
			{loading && <Spinner className={styles.spinner} />}

			{!loading && users?.length === 0 && <h2 className="no-records-message">No users to list...</h2>}

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
								<button title="Edit user" onClick={handleAccountAction('edit', user)}>
									<Icon name="pencil" size={16} />
								</button>

								<button title="Delete user" onClick={handleAccountAction('delete', user)}>
									<Icon name="trashCan" size={16} />
								</button>
							</div>
						</li>
					))}
				</ul>
			)}

			<Button title="Add new user" className="floating-action" onClick={() => openModal({})}>
				<Icon name="add" size={25} />
			</Button>

			{/* Add/edit user modal */}
			{modalProps && (
				<Modal className="form-modal" close={closeModal}>
					<h2>{modalProps?.user ? `Edit ${modalProps?.user.name}` : 'Add a new user'}</h2>

					<form onSubmit={handleFormSubmit}>
						<Input name="name" value={modalProps.user?.name} placeholder="Set the user's name" required />
						<Input type="email" name="email" value={modalProps.user?.email} placeholder="Set the user's email" required />
						<Input type="date" name="birth_date" value={modalProps.user?.birth_date} required />
						<Button type="submit">{`${modalProps?.user ? 'Edit' : 'Add'} user`}</Button>
					</form>
				</Modal>
			)}
		</Layout>
	);
}
