from typing import List, Union
from models.account import Account
from schemas.account import AccountBase, AccountSchema
from config.api import router
from shared import crud


class AccountsController:
    @router.get("/accounts")
    def get_accounts() -> List[AccountSchema]:
        # Gets all accounts
        return crud.get(Account)

    @router.get("/accounts/{id}")
    def get_account_by_id(id: int) -> Union[AccountSchema, None]:
        # Gets an account by ID
        return crud.get_by_id(Account, id)

    @router.post("/accounts")
    def create_account(payload: AccountBase) -> AccountSchema:
        # Creates an account
        return crud.create(Account, payload)

    @router.put("/accounts/{id}")
    def edit_account(id: int, payload: AccountBase) -> AccountSchema:
        # Edits an account
        return crud.edit(Account, id, payload)

    @router.delete("/accounts/{id}")
    def delete_account(id: int) -> AccountSchema:
        # Deletes an account
        return crud.delete(Account, id)
