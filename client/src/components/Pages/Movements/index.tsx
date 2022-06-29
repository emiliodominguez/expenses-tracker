import Layout from '@app/components/Layout';
import { Spinner, Modal, Input, Button, useModal, Icon } from '@app/components/Shared';
import { useMovementsContext, useUsersContext } from '@app/contexts';
import { IMovement } from '@app/models';
import styles from './Movements.module.scss';

export function Movements(): JSX.Element {
	const { currentUser } = useUsersContext();
	const {
		movementsData: { data: movements, loading },
		createMovement,
		updateMovement,
		deleteMovement
	} = useMovementsContext();
	const { modalProps, openModal, closeModal } = useModal<{ movement?: IMovement }>();

	return (
		<Layout title="Movements">
			{loading && <Spinner />}

			{!loading && movements?.length === 0 && <h2 className="no-records-message">No movements to list...</h2>}

			{!loading && movements?.length > 0 && <ul className={styles.movements}></ul>}

			<Button className="floating-action" title="Add movement" onClick={() => openModal({})}>
				<Icon name="add" size={25} />
			</Button>

			{/* Add/edit user movement */}
			{modalProps && (
				<Modal className="form-modal" close={closeModal}>
					<h2>{modalProps?.movement ? 'Edit' : 'Add'} movement</h2>
				</Modal>
			)}
		</Layout>
	);
}
