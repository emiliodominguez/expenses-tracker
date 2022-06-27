from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from config.db import Base


class Movement(Base):
    __tablename__ = "movements"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)
    date = Column(Date)
    amount = Column(Integer)
    currency = Column(String)
    note = Column(String, nullable=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    account_id = Column(Integer, ForeignKey("accounts.id"))
    card_id = Column(Integer, ForeignKey("cards.id"), nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)

    user = relationship("User", backref="user_movements")
    category = relationship("Category", backref="category_movements")
    account = relationship("Account", backref="account_movements")
    card = relationship("Card", backref="card_movements")
