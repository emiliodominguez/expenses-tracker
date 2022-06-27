from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base


class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String)
    bank = Column(String)
    balance = Column(Integer, nullable=True)
    type = Column(String)
    number = Column(Integer)
    expiration_date = Column(Date)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", backref="user_cards")
