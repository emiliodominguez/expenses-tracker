from pydantic import BaseModel
from datetime import date


class MovementBase(BaseModel):
    type: str
    date: date
    amount: int
    currency: str
    note: str = ""
    user_id: int
    account_id: int
    category_id: int = None


class MovementSchema(MovementBase):
    id: int

    class Config:
        orm_mode = True
