from typing import List, Union
from models.movement import Movement
from schemas.movement import MovementBase, MovementSchema
from config.api import router, API_METHODS
from shared import crud


class MovementsController:
    """## The Movements route controller"""

    @router.get("/movements/{user_id}", tags=[API_METHODS["GET"]])
    def get_movements(user_id: int) -> List[MovementSchema]:
        """## Gets all user movements

        Args:
            user_id (int): The user ID

        Returns:
            List[MovementSchema]: The movements list
        """
        return crud.get_many_filtered(Movement, Movement.user_id == user_id)

    @router.get("/movements/{movement_id}", tags=[API_METHODS["GET_BY_ID"]])
    def get_movement_by_id(movement_id: int) -> Union[MovementSchema, None]:
        """## Gets a movement by ID

        Args:
            movement_id (int): The movement ID

        Returns:
            Union[MovementSchema, None]: The movement
        """
        return crud.get_one_by_id(Movement, movement_id)

    @router.post("/movements", tags=[API_METHODS["CREATE"]])
    def create_movement(payload: MovementBase) -> MovementSchema:
        """## Creates a movement

        Args:
            payload (MovementBase): The movement payload

        Returns:
            MovementSchema: The created movement
        """
        return crud.create(Movement, payload)

    @router.put("/movements/{movement_id}", tags=[API_METHODS["UPDATE"]])
    def edit_movement(movement_id: int, payload: MovementBase) -> MovementSchema:
        """## Edits a movement

        Args:
            movement_id (int): The movement ID
            payload (MovementBase): The movement payload

        Returns:
            MovementSchema: The edited movement
        """
        return crud.edit(Movement, movement_id, payload)

    @router.delete("/movements/{movement_id}", tags=[API_METHODS["DELETE"]])
    def delete_movement(movement_id: int) -> MovementSchema:
        """## Deletes a movement

        Args:
            movement_id (int): The movement ID

        Returns:
            MovementSchema: The deleted movement
        """
        return crud.delete(Movement, movement_id)
