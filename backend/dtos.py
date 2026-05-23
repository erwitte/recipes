from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional

class Recipe(BaseModel):
    titel: str = Field(..., min_length=1, max_length=255)
    ingredients: List[str]
    steps: List[str]

# DTO für die API-Antwort 
class RecipeOut(Recipe):
    id: int
    # Erlaubt Pydantic, Daten direkt aus SQLAlchemy-Objekten zu lesen
    model_config = ConfigDict(from_attributes=True)


class Album(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    image_url: str


class AlbumOut(Album):
    id: int
    
    model_config = ConfigDict(from_attributes=True)

class User(BaseModel):
    vorname: str = Field(..., min_length=1, max_length=255)
    email: EmailStr