from typing import List
from pydantic import BaseModel
from datetime import date
from schemas import AccountSchema, CardSchema


class UserBase(BaseModel):
    name: str
    email: str
    birth_date: date


class UserSchema(UserBase):
    id: int
    accounts: List[AccountSchema]
    cards: List[CardSchema]

    class Config:
        orm_mode = True
