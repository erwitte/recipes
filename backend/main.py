from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from db.create_db import get_db, create_tables
from db.models import Recipe as RecipeModel
from dtos import *
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server wird gestartet und Tabellen werden erstellt")
    create_tables() 
    yield
    print("Server wird heruntergefahren")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allows all headers (Content-Type, Authorization, etc.)
)

@app.post("/recipe")
def create_recipe(recipe: Recipe, db: Session = Depends(get_db)):
    try:
        db_recipe = RecipeModel(title=recipe.title, ingredients=recipe.ingredients, steps=recipe.steps)
        db.add(db_recipe)
        db.commit()
        db.refresh(db_recipe)
        return db_recipe
    except Exception as e:
        print(e)
        return None

@app.get("/recipe", response_model=List[RecipeOut])
def get_all_recipes(db: Session = Depends(get_db)):
    try:
        recipes = db.query(RecipeModel).all()
        return recipes
    except Exception as e:
        print(e)
        return None

@app.get("/recipes/{id}", response_model=RecipeOut)
def get_recipe_by_id(id: int, db: Session = Depends(get_db)):
    try:
        recipes = db.query(RecipeModel).filter(RecipeModel.id == id).first()
        if recipes is None:
            raise HTTPException(status_code=404, detail="Recipe not found")
        return recipes
    except Exception as e:
        print(e)
        return None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)