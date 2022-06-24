from typing import List, Union
from models.account import Account
from schemas.account import AccountBase, AccountSchema
from config.api import router
from shared.crud import CRUD


class AccountsController:
    @router.get("/accounts")
    def get_accounts() -> List[AccountSchema]:
        # Gets all accounts
        return CRUD.get(Account)

    @router.get("/accounts/{id}")
    def get_account_by_id(id: int) -> Union[AccountSchema, None]:
        # Gets an account by ID
        return CRUD.get_by_id(Account, id)

    @router.post("/accounts")
    def create_account(payload: AccountBase) -> AccountSchema:
        # Creates an account
        return CRUD.create(Account, payload)

    @router.put("/accounts/{id}")
    def edit_account(id: int, payload: AccountBase) -> AccountSchema:
        # Edits an account
        return CRUD.edit(Account, id, payload)

    @router.delete("/accounts/{id}")
    def delete_account(id: int) -> AccountSchema:
        # Deletes an account
        return CRUD.delete(Account, id)
