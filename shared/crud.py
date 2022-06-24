from typing import List, Union, TypeVar
from http.client import HTTPException
from config.db import session

# Generic types
Model = TypeVar("Model")
ModelPayload = TypeVar("ModelPayload")
Schema = TypeVar("Schema")


class CRUD:
    @staticmethod
    def get(model: Model) -> List[Schema]:
        return session.query(model).all()

    @staticmethod
    def get_by_id(model: Model, id: int) -> Union[Schema, None]:
        element = session.query(model).get(id)

        if not element:
            raise HTTPException(f"Entity with ID: {id} was not found")

        return element

    @staticmethod
    def create(model: Model, payload: ModelPayload) -> Schema:
        element = model()

        for key, value in payload:
            setattr(element, key, value)

        session.add(element)
        session.commit()
        session.refresh(element)
        return element

    @staticmethod
    def edit(model: Model, id: int, payload: ModelPayload) -> Schema:
        element = session.query(model).get(id)

        if not element:
            raise HTTPException(f"Entity with ID: {id} was not found")

        for key, value in payload:
            setattr(element, key, value)

        session.commit()
        session.refresh(element)
        return element

    @staticmethod
    def delete(model: Model, id: int) -> Schema:
        element = session.query(model).get(id)

        if not element:
            raise HTTPException(f"Entity with ID: {id} was not found")

        session.delete(element)
        session.commit()
        return element
