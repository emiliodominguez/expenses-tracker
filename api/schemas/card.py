from pydantic import BaseModel
from datetime import date


class CardBase(BaseModel):
    brand: str
    bank: str
    number: str
    type: int
    expiration_date: date


class CardSchema(CardBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
