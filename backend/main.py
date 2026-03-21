from fastapi import FastAPI
from contextlib import asynccontextmanager
from db.create_db import create_tables
from dtos import User

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server wird gestartet und Tabellen werden erstellt")
    create_tables() 
    yield
    print("Server wird heruntergefahren")

app = FastAPI(lifespan=lifespan)

@app.post("/register")
def register(user: User):
    print(user)
    return {"message": "Registration successful"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)