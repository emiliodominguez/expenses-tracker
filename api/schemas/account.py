from pydantic import BaseModel


class AccountBase(BaseModel):
    name: str
    amount: int
    currency: str
    type: str
    active: bool
    note: str = ""


class AccountSchema(AccountBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True
