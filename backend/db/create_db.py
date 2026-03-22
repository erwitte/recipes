from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from db.models import Base

engine = create_engine('postgresql://user:password@localhost/recipes')
SessionLocal = sessionmaker(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def create_tables():
    try:
        Base.metadata.create_all(engine)
    except Exception as e:
        print(f"Error creating tables: {e}")
