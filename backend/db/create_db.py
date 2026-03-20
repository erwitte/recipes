from sqlalchemy import Column, Integer, String, Text, LargeBinary, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine

Base = declarative_base()

class Album(Base):
    __tablename__ = 'alben'
    
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    
    # "Ein Album hält X Rezepte" (One-to-Many)
    # cascade="all, delete-orphan" sorgt dafür, dass Rezepte gelöscht werden, 
    # wenn das Album gelöscht wird.
    rezepte = relationship("Rezept", back_populates="album", cascade="all, delete-orphan")

class Rezept(Base):
    __tablename__ = 'rezepte'
    
    id = Column(Integer, primary_key=True)
    titel = Column(Text, nullable=False)
    
    # Arrays für Zutaten und Schritte
    zutaten = Column(ARRAY(Text))
    schritte = Column(ARRAY(Text))
    
    # Array für Binärdaten (Bilder)
    bilder = Column(ARRAY(Text))
    
    # Fremdschlüssel: "Jedes Rezept ist in genau einem Album"
    album_id = Column(Integer, ForeignKey('alben.id'), nullable=False)
    album = relationship("Album", back_populates="rezepte")

def create_tables():
    try:
        engine = create_engine('postgresql://user:password@localhost/recipes')
        Base.metadata.create_all(engine)
        print("Tables created successfully.")
    except Exception as e:
        print(f"Error creating tables: {e}")

if __name__ == "__main__":
    create_tables()