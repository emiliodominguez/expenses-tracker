from pydantic import BaseModel
from datetime import date


class CardBase(BaseModel):
    brand: str
    bank: str
    number: str
    type: int
    expiration_date: date
    user_id: int


class CardSchema(CardBase):
    id: int

    class Config:
        orm_mode = True
