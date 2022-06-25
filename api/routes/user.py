from typing import List, Union
from models.user import User
from schemas.user import UserBase, UserSchema
from config.api import router
from shared import crud


class UsersController:
    @router.get("/users")
    def get_users() -> List[UserSchema]:
        # Gets all users
        return crud.get(User)

    @router.get("/users/{id}")
    def get_user_by_id(id: int) -> Union[UserSchema, None]:
        # Gets a user by ID
        return crud.get_by_id(User, id)

    @router.post("/users")
    def create_user(payload: UserBase) -> UserSchema:
        # Creates a user
        return crud.create(User, payload)

    @router.put("/users/{id}")
    def edit_user(id: int, payload: UserBase) -> UserSchema:
        # Edits a user
        return crud.edit(User, id, payload)

    @router.delete("/users/{id}")
    def delete_user(id: int) -> UserSchema:
        # Deletes a user
        return crud.delete(User, id)
