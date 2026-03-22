from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from db.create_db import get_db
from db.create_db import Album as AlbumModel, Rezept as RezeptModel, User as UserModel
from db.create_db import create_tables
from dtos import *

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server wird gestartet und Tabellen werden erstellt")
    create_tables() 
    yield
    print("Server wird heruntergefahren")

app = FastAPI(lifespan=lifespan)

@app.post("/album",response_model=AlbumOut)
def create_album(album: Album, db: Session = Depends(get_db)):
    try:
        db_album = AlbumModel(name=album.titel)
        db.add(db_album)
        db.commit()
        db.refresh(db_album)
        return db_album
    except Exception as e:
        print(e)
        return None

@app.post("/register", response_model=User)
def register(user: User, db: Session = Depends(get_db)):
    try:
        db_user = UserModel(vorname=user.vorname, email=user.email)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        print(e)
        return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)