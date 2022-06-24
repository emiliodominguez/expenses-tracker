from pydantic import BaseModel
from datetime import date


class ExpenseBase(BaseModel):
    type: str
    date: date
    amount: int
    account: int
    currency: str
    note: str = ""


class ExpenseSchema(ExpenseBase):
    id: int
    user_id: int
    category_id: int
    account_id: int

    class Config:
        orm_mode = True
