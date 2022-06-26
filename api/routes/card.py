from typing import List, Union
from models.card import Card
from schemas.card import CardBase, CardSchema
from config.api import router, API_METHODS
from shared import crud


class CardsController:
    """The Cards route controller"""

    @router.get("/cards", tags=[API_METHODS["GET"]])
    def get_cards() -> List[CardSchema]:
        """## Gets all cards

        Returns:
            List[CardSchema]: The cards list
        """
        return crud.get(Card)

    @router.get("/cards/{card_id}", tags=[API_METHODS["GET_BY_ID"]])
    def get_card_by_id(card_id: int) -> Union[CardSchema, None]:
        """## Gets an card by ID

        Args:
            card_id (int): The card ID

        Returns:
            Union[CardSchema, None]: The card
        """
        return crud.get_by_id(Card, card_id)

    @router.post("/cards", tags=[API_METHODS["CREATE"]])
    def create_card(payload: CardBase) -> CardSchema:
        """## Creates an card

        Args:
            payload (CardBase): The card payload

        Returns:
            CardSchema: The created card
        """
        return crud.create(Card, payload)

    @router.put("/cards/{card_id}", tags=[API_METHODS["UPDATE"]])
    def edit_card(card_id: int, payload: CardBase) -> CardSchema:
        """## Edits an card

        Args:
            card_id (int): The card ID
            payload (CardBase): The card payload

        Returns:
            CardSchema: The edited card
        """
        return crud.edit(Card, card_id, payload)

    @router.delete("/cards/{card_id}", tags=[API_METHODS["DELETE"]])
    def delete_card(card_id: int) -> CardSchema:
        """## Deletes an card

        Args:
            card_id (int): The card

        Returns:
            CardSchema: The deleted card
        """
        return crud.delete(Card, card_id)
