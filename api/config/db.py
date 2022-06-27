from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Engine
engine = create_engine(
    'sqlite:///expense-tracker.sqlite',
    connect_args={"check_same_thread": False}
)

# Session
Session = sessionmaker(bind=engine)
session = Session()

# Base model
Base = declarative_base()


def init_db() -> None:
    """## Initializes the database"""
    Base.metadata.create_all(bind=engine)
    print("🚀   Database initialized")
