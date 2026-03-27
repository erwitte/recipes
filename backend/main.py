from fastapi import FastAPI, Depends
from contextlib import asynccontextmanager
from sqlalchemy.orm import Session
from db.create_db import get_db, create_tables
from db.models import Album as AlbumModel, Rezept as RezeptModel, User as UserModel
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

@app.post("/album")
def create_album(album: Album, db: Session = Depends(get_db)):
    dummy_albums = [
        {
            "id": 1, 
            "name": "Discovery", 
            "image_url": "https://via.placeholder.com/150", 
            "link": "https://example.com/1"
        },
        {
            "id": 2, 
            "name": "Random Access Memories", 
            "image_url": "https://via.placeholder.com/150", 
            "link": "https://example.com/2"
        }
    ]
    return dummy_albums

@app.get("/collection", response_model=List[AlbumOut])
def get_collection(db: Session = Depends(get_db)):
    dummy_albums = [
        {
            "id": 1, 
            "name": "Discovery", 
            "image_url": "https://via.placeholder.com/150", 
            "link": "https://example.com/1"
        },
        {
            "id": 2, 
            "name": "Random Access Memories", 
            "image_url": "https://via.placeholder.com/150", 
            "link": "https://example.com/2"
        }
    ]
    return dummy_albums


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