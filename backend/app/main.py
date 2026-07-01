from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.auth_route import auth_router
from app.routes.trans_route import trans_router
from app.database.db import Base,engine
from app.config import DATABASE_URL

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Bhandar - Unified UPI Passbook",version="1.0.0")


app.add_middleware(CORSMiddleware,
               allow_origins=["*"],
               allow_credentials=True,
               allow_headers=["*"],
               allow_methods=["*"]
            )

app.include_router(auth_router)
app.include_router(trans_router)
@app.get("/")
def root():
    return {
        "message":"Hello Bhandar"
    }