from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str
    note: str = ""


class CategorySchema(CategoryBase):
    id: int

    class Config:
        orm_mode = True
