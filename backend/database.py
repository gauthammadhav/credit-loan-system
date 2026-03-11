from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# You can configure this via environment variables or .env file
# For now, substituting with a default local postgresql URL format
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL", 
    "postgresql://postgres:postgres@localhost:5432/credit_loan_db"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
