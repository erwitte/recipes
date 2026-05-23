from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, Text, LargeBinary, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY

Base = declarative_base()

class Recipe(Base):
    __tablename__ = 'recipes'
    
    id = Column(Integer, primary_key=True)
    titel = Column(Text, nullable=False)
    
    ingredients = Column(ARRAY(Text))
    steps = Column(ARRAY(Text))
    
    # Array für S3 (Bilder)
    images = Column(ARRAY(Text))

