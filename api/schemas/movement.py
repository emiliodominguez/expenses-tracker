from pydantic import BaseModel
from datetime import date


class MovementBase(BaseModel):
    type: str
    date: date
    amount: int
    account: int
    currency: str
    note: str = ""
    user_id: int
    category_id: int
    account_id: int


class MovementSchema(MovementBase):
    id: int

    class Config:
        orm_mode = True
