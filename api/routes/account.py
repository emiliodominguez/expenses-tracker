from typing import List, Union
from models.account import Account
from schemas.account import AccountBase, AccountSchema
from config.api import router, API_TAGS
from shared import crud


class AccountsController:
    """The Accounts route controller"""

    @router.get("/accounts/{user_id}", tags=[API_TAGS["GET"]])
    def get_accounts(user_id: int) -> List[AccountSchema]:
        """## Gets all user accounts

        Args:
            user_id (int): The user ID

        Returns:
            List[AccountSchema]: The accounts list
        """
        return crud.get_many_filtered(Account, Account.user_id == user_id)

    @router.get("/accounts/{account_id}", tags=[API_TAGS["GET_BY_ID"]])
    def get_account_by_id(account_id: int) -> Union[AccountSchema, None]:
        """## Gets an account by ID

        Args:
            account_id (int): The account ID

        Returns:
            Union[AccountSchema, None]: The account
        """
        return crud.get_one_by_id(Account, account_id)

    @router.post("/accounts", tags=[API_TAGS["CREATE"]])
    def create_account(payload: AccountBase) -> AccountSchema:
        """## Creates an account

        Args:
            payload (AccountBase): The account payload

        Returns:
            AccountSchema: The created account
        """
        return crud.create(Account, payload)

    @router.put("/accounts/{account_id}", tags=[API_TAGS["UPDATE"]])
    def edit_account(account_id: int, payload: AccountBase) -> AccountSchema:
        """## Edits an account

        Args:
            account_id (int): The account ID
            payload (AccountBase): The account payload

        Returns:
            AccountSchema: The edited account
        """
        return crud.edit(Account, account_id, payload)

    @router.delete("/accounts/{account_id}", tags=[API_TAGS["DELETE"]])
    def delete_account(account_id: int) -> AccountSchema:
        """## Deletes an account

        Args:
            account_id (int): The account

        Returns:
            AccountSchema: The deleted account
        """
        return crud.delete(Account, account_id)
