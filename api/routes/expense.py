from typing import List, Union
from models.expense import Expense
from schemas.expense import ExpenseBase, ExpenseSchema
from config.api import router
from shared import crud


class ExpensesController:
    @router.get("/expenses")
    def get_expenses() -> List[ExpenseSchema]:
        # Gets all expenses
        return crud.get(Expense)

    @router.get("/expenses/{id}")
    def get_expense_by_id(id: int) -> Union[ExpenseSchema, None]:
        # Gets an expense by ID
        return crud.get_by_id(Expense, id)

    @router.post("/expenses")
    def create_expense(payload: ExpenseBase) -> ExpenseSchema:
        # Creates an expense
        return crud.create(Expense, payload)

    @router.put("/expenses/{id}")
    def edit_expense(id: int, payload: ExpenseBase) -> ExpenseSchema:
        # Edits an expense
        return crud.edit(Expense, id, payload)

    @router.delete("/expenses/{id}")
    def delete_expense(id: int) -> ExpenseSchema:
        # Deletes an expense
        return crud.delete(Expense, id)
