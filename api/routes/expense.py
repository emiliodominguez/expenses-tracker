from typing import List, Union
from models.expense import Expense
from schemas.expense import ExpenseBase, ExpenseSchema
from config.api import router, API_METHODS
from shared import crud


class ExpensesController:
    """## The Expenses route controller"""

    @router.get("/expenses", tags=[API_METHODS["GET"]])
    def get_expenses() -> List[ExpenseSchema]:
        """## Gets all expenses

        Returns:
            List[ExpenseSchema]: The expenses list
        """
        return crud.get(Expense)

    @router.get("/expenses/{id}", tags=[API_METHODS["GET_BY_ID"]])
    def get_expense_by_id(expense_id: int) -> Union[ExpenseSchema, None]:
        """## Gets an expense by ID

        Args:
            expense_id (int): The expense ID

        Returns:
            Union[ExpenseSchema, None]: The expense
        """
        return crud.get_by_id(Expense, expense_id)

    @router.post("/expenses", tags=[API_METHODS["CREATE"]])
    def create_expense(payload: ExpenseBase) -> ExpenseSchema:
        """## Creates an expense

        Args:
            payload (ExpenseBase): The expense payload

        Returns:
            ExpenseSchema: The created expense
        """
        return crud.create(Expense, payload)

    @router.put("/expenses/{id}", tags=[API_METHODS["UPDATE"]])
    def edit_expense(expense_id: int, payload: ExpenseBase) -> ExpenseSchema:
        """## Edits an expense

        Args:
            expense_id (int): The expense ID
            payload (ExpenseBase): The expense payload

        Returns:
            ExpenseSchema: The edited expense
        """
        return crud.edit(Expense, expense_id, payload)

    @router.delete("/expenses/{id}", tags=[API_METHODS["DELETE"]])
    def delete_expense(expense_id: int) -> ExpenseSchema:
        """## Deletes an expense

        Args:
            expense_id (int): The expense ID

        Returns:
            ExpenseSchema: The deleted expense
        """
        return crud.delete(Expense, expense_id)
