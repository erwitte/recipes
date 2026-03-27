from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, Text, LargeBinary, ForeignKey
from sqlalchemy.dialects.postgresql import ARRAY

Base = declarative_base()

class Album(Base):
    __tablename__ = 'alben'
    
    id = Column(Integer, primary_key=True)
    name = Column(Text, nullable=False)
    image_url = Column(Text, nullable=True)
    
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
    
    # Array für S3 (Bilder)
    bilder = Column(ARRAY(Text))
    
    # Fremdschlüssel: "Jedes Rezept ist in genau einem Album"
    album_id = Column(Integer, ForeignKey('alben.id'), nullable=False)
    album = relationship("Album", back_populates="rezepte")

class User(Base):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    vorname = Column(Text, nullable=False)
    email = Column(Text, nullable=False)