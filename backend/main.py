from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
# from dotenv import load_dotenv

# load_dotenv()

app = FastAPI()

# Include Routers
from routers import matching, ai_tutor

app.include_router(matching.router, prefix="/api", tags=["matching"])
app.include_router(ai_tutor.router, prefix="/api", tags=["ai"])

# CORS configuration
origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Skill Share Circle Backend is running"}

# Placeholder for matching logic
class MatchRequest(BaseModel):
    user_id: str
    skills_wanted: List[str]

@app.post("/api/match")
def find_matches(request: MatchRequest):
    # TODO: Implement cosine similarity logic here
    return {"matches": []}

