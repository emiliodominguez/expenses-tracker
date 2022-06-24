from typing import List, Union
from models.category import Category
from schemas.category import CategoryBase, CategorySchema
from config.api import router
from shared.crud import CRUD


class CategorysController:
    @router.get("/categorys")
    def get_categorys() -> List[CategorySchema]:
        # Gets all categorys
        return CRUD.get(Category)

    @router.get("/categorys/{id}")
    def get_category_by_id(id: int) -> Union[CategorySchema, None]:
        # Gets a category by ID
        return CRUD.get_by_id(Category, id)

    @router.post("/categorys")
    def create_category(payload: CategoryBase) -> CategorySchema:
        # Creates a category
        return CRUD.create(Category, payload)

    @router.put("/categorys/{id}")
    def edit_category(id: int, payload: CategoryBase) -> CategorySchema:
        # Edits a category
        return CRUD.edit(Category, id, payload)

    @router.delete("/categorys/{id}")
    def delete_category(id: int) -> CategorySchema:
        # Deletes a category
        return CRUD.delete(Category, id)
