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
def create_rezept(rezept: Rezept, db: Session = Depends(get_db)):
    try:
        db_rezept = RecipeModel(titel=rezept.titel, ingredients=rezept.zutaten, steps=rezept.schritte)
        db.add(db_rezept)
        db.commit()
        db.refresh(db_rezept)
        return db_rezept
    except Exception as e:
        print(e)
        return None

@app.get("/recipe", response_model=List[RezeptOut])
def get_all_rezepte(db: Session = Depends(get_db)):
    try:
        rezepte = db.query(RezeptModel).all()
        return rezepte
    except Exception as e:
        print(e)
        return None

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)