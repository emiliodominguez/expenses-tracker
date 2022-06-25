from typing import List, Union
from models.category import Category
from schemas.category import CategoryBase, CategorySchema
from config.api import router
from shared import crud


class CategoriesController:
    @router.get("/categories")
    def get_categories() -> List[CategorySchema]:
        # Gets all categorys
        return crud.get(Category)

    @router.get("/categories/{id}")
    def get_category_by_id(id: int) -> Union[CategorySchema, None]:
        # Gets a category by ID
        return crud.get_by_id(Category, id)

    @router.post("/categories")
    def create_category(payload: CategoryBase) -> CategorySchema:
        # Creates a category
        return crud.create(Category, payload)

    @router.put("/categories/{id}")
    def edit_category(id: int, payload: CategoryBase) -> CategorySchema:
        # Edits a category
        return crud.edit(Category, id, payload)

    @router.delete("/categories/{id}")
    def delete_category(id: int) -> CategorySchema:
        # Deletes a category
        return crud.delete(Category, id)
