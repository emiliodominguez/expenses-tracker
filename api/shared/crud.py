from typing import List, Union, TypeVar
from http.client import HTTPException
from config.db import session

# Generic types
Model = TypeVar("Model")
ModelPayload = TypeVar("ModelPayload")
Schema = TypeVar("Schema")


def get(model: Model) -> List[Schema]:
    """### Gets stored records of any given model

    Args:
        model (Model): The model

    Returns:
        List[Schema]: The records list
    """
    return session.query(model).all()


def get_by_id(model: Model, id: int) -> Union[Schema, None]:
    """### Gets any given model record by ID

    Args:
        model (Model): The model
        id (int): The ID

    Raises:
        HTTPException: The exception in case of not retrieving the record

    Returns:
        Union[Schema, None]: The record
    """
    element = session.query(model).get(id)

    if not element:
        raise HTTPException(f"Entity with ID: {id} was not found")

    return element


def create(model: Model, payload: ModelPayload) -> Schema:
    """### Creates a record based on any given model

    Args:
        model (Model): The model
        payload (ModelPayload): The record's payload

    Returns:
        Schema: The created record
    """
    element = model()

    for key, value in payload:
        setattr(element, key, value)

    session.add(element)
    session.commit()
    session.refresh(element)
    return element


def edit(model: Model, id: int, payload: ModelPayload) -> Schema:
    """### Edits a record based on any given model

    Args:
        model (Model): The model
        id (int): The ID
        payload (ModelPayload): The record's payload

    Raises:
        HTTPException: The exception in case of not editing the record

    Returns:
        Schema: The edited record
    """
    element = session.query(model).get(id)

    if not element:
        raise HTTPException(f"Entity with ID: {id} was not found")

    for key, value in payload:
        setattr(element, key, value)

    session.commit()
    session.refresh(element)
    return element


def delete(model: Model, id: int) -> Schema:
    """### Deletes a record based on any given model

    Args:
        model (Model): The model
        id (int): The ID

    Raises:
        HTTPException: The exception in case of not deleting the record

    Returns:
        Schema: The deleted record
    """
    element = session.query(model).get(id)

    if not element:
        raise HTTPException(f"Entity with ID: {id} was not found")

    session.delete(element)
    session.commit()
    return element
