from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    amount = Column(Integer)
    currency = Column(String)
    type = Column(String)
    note = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", backref="user")
