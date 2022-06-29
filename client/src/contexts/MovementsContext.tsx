import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useInjection } from 'inversify-react';
import type MovementsService from '@app/services/movements.service';
import { Services } from '@app/services/services.enum';
import { IRequestPayload, IMovement, TMovementPayload } from '@app/models';
import { useUsersContext } from './UsersContext';

interface IMovementsContext {
	movementsData: IRequestPayload<IMovement>;
	createMovement: (payload: TMovementPayload) => Promise<IMovement>;
	updateMovement: (id: number, payload: TMovementPayload) => Promise<IMovement>;
	deleteMovement: (id: number) => Promise<IMovement>;
}

const MovementsContext = createContext<IMovementsContext>({} as IMovementsContext);

export function MovementsContextProvider(props: PropsWithChildren<{}>): JSX.Element {
	const { currentUser } = useUsersContext();
	const [movementsData, setMovementsData] = useState<IRequestPayload<IMovement>>({ data: [], loading: true });
	const movementsService = useInjection<MovementsService>(Services.MovementsService);

	function getMovements(): { abortController?: AbortController } {
		if (!currentUser) return {};

		const abortController = new AbortController();

		setMovementsData(prev => ({ ...prev, loading: true, error: undefined }));

		try {
			movementsService.get(currentUser.id, abortController.signal).then(data => {
				if (data) setMovementsData({ data, loading: false, error: undefined });
			});
		} catch (error) {
			setMovementsData(prev => ({ ...prev, loading: false, error: error as Error }));
		}

		return { abortController };
	}

	async function createMovement(payload: TMovementPayload): Promise<IMovement> {
		const createdMovement = await movementsService.create(payload);
		getMovements();
		return createdMovement;
	}

	async function updateMovement(id: number, payload: TMovementPayload): Promise<IMovement> {
		const updatedMovement = await movementsService.update(id, payload);
		getMovements();
		return updatedMovement;
	}

	async function deleteMovement(id: number): Promise<IMovement> {
		const deletedMovement = await movementsService.delete(id);
		getMovements();
		return deletedMovement;
	}

	useEffect(() => {
		const { abortController: getMovementsController } = getMovements();

		return () => {
			getMovementsController?.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser]);

	return (
		<MovementsContext.Provider
			value={{
				movementsData,
				createMovement,
				updateMovement,
				deleteMovement
			}}>
			{props.children}
		</MovementsContext.Provider>
	);
}

export function useMovementsContext(): IMovementsContext {
	const context = useContext(MovementsContext);

	if (!Object.entries(context).length) {
		throw new Error('useMovementsContext must be used within MovementsContext');
	}

	return context;
}
