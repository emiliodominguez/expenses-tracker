from sqlalchemy import Column, Integer, String
from config.db import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    note = Column(String, nullable=True)
