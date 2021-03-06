from typing import List, Union
from models.category import Category
from schemas.category import CategoryBase, CategorySchema
from config.api import router, API_TAGS
from shared import crud


class CategoriesController:
    """## The Categories route controller"""

    @router.get("/categories", tags=[API_TAGS["GET"]])
    def get_categories() -> List[CategorySchema]:
        """## Gets all categories

        Returns:
            List[CategorySchema]: The categories list
        """
        return crud.get_many(Category)

    @router.get("/categories/{category_id}", tags=[API_TAGS["GET_BY_ID"]])
    def get_category_by_id(category_id: int) -> Union[CategorySchema, None]:
        """## Gets a category by ID

        Args:
            category_id (int): The category ID

        Returns:
            Union[CategorySchema, None]: The category
        """
        return crud.get_one_by_id(Category, category_id)

    @router.post("/categories", tags=[API_TAGS["CREATE"]])
    def create_category(payload: CategoryBase) -> CategorySchema:
        """## Creates a category

        Args:
            payload (CategoryBase): The category payload

        Returns:
            CategorySchema: The created category
        """
        return crud.create(Category, payload)

    @router.put("/categories/{category_id}", tags=[API_TAGS["UPDATE"]])
    def edit_category(category_id: int, payload: CategoryBase) -> CategorySchema:
        """## Edits a category

        Args:
            category_id (int): The category ID
            payload (CategoryBase): The category payload

        Returns:
            CategorySchema: The edited category
        """
        return crud.edit(Category, category_id, payload)

    @router.delete("/categories/{category_id}", tags=[API_TAGS["DELETE"]])
    def delete_category(category_id: int) -> CategorySchema:
        """## Deletes a category

        Args:
            category_id (int): The category ID

        Returns:
            CategorySchema: The deleted category
        """
        return crud.delete(Category, category_id)
