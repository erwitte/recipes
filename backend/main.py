from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/login")
def login():
    return {"message": "Login successful"}

@app.post("/register")
def register():
    return {"message": "Registration successful"}