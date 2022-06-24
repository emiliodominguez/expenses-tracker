from pydantic import BaseModel
from datetime import date


class UserBase(BaseModel):
    name: str
    email: str
    birth_date: date


class UserSchema(UserBase):
    id: int

    class Config:
        orm_mode = True
