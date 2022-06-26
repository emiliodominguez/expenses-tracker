from typing import List, Union
from models.user import User
from schemas.user import UserBase, UserSchema
from config.api import router, API_METHODS
from shared import crud


class UsersController:
    """## The Users route controller"""

    @router.get("/users", tags=[API_METHODS["GET"]])
    def get_users() -> List[UserSchema]:
        """## Gets all users

        Returns:
            List[UserSchema]: The list of users
        """
        return crud.get(User)

    @router.get("/users/{id}", tags=[API_METHODS["GET_BY_ID"]])
    def get_user_by_id(user_id: int) -> Union[UserSchema, None]:
        """## Gets a user by ID

        Args:
            user_id (int): The user ID

        Returns:
            Union[UserSchema, None]: The user
        """
        return crud.get_by_id(User, user_id)

    @router.post("/users", tags=[API_METHODS["CREATE"]])
    def create_user(payload: UserBase) -> UserSchema:
        """## Creates a user

        Args:
            payload (UserBase): The user payload

        Returns:
            UserSchema: The created user
        """
        return crud.create(User, payload)

    @router.put("/users/{id}", tags=[API_METHODS["UPDATE"]])
    def edit_user(user_id: int, payload: UserBase) -> UserSchema:
        """## Edits a user

        Args:
            user_id (int): The user ID
            payload (UserBase): The user payload

        Returns:
            UserSchema: The edited user
        """
        return crud.edit(User, user_id, payload)

    @router.delete("/users/{id}", tags=[API_METHODS["DELETE"]])
    def delete_user(user_id: int) -> UserSchema:
        """## Deletes a user

        Args:
            user_id (int): The user ID

        Returns:
            UserSchema: The deleted user
        """
        return crud.delete(User, user_id)
