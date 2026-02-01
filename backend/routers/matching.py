from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

router = APIRouter()

class Profile(BaseModel):
    id: str
    name: str
    skills_offered: List[str] # List of skill names

class MatchRequest(BaseModel):
    user: Profile
    candidates: List[Profile]
    skills_wanted: List[str]

@router.post("/match")
async def calculate_matches(request: MatchRequest):
    if not request.candidates:
        return {"matches": []}

    # Prepare data for TF-IDF
    # We want to match 'skills_wanted' (query) against 'skills_offered' (documents)
    
    query = " ".join(request.skills_wanted)
    
    candidate_docs = [" ".join(p.skills_offered) for p in request.candidates]
    
    # Corpus = [query] + candidate_docs
    corpus = [query] + candidate_docs
    
    try:
        vectorizer = TfidfVectorizer()
        tfidf_matrix = vectorizer.fit_transform(corpus)
        
        # Calculate cosine similarity between query (index 0) and all candidates
        cosine_sim = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:])
        
        # Flatten result
        scores = cosine_sim[0]
        
        matches = []
        for i, score in enumerate(scores):
            matches.append({
                "profile": request.candidates[i],
                "score": float(score)
            })
            
        # Sort by score descending
        matches.sort(key=lambda x: x["score"], reverse=True)
        
        return {"matches": matches}
        
    except Exception as e:
        print(f"Error in matching: {e}")
        # Fallback: simple intersection count
        matches = []
        wanted_set = set([s.lower() for s in request.skills_wanted])
        for p in request.candidates:
            offered_set = set([s.lower() for s in p.skills_offered])
            intersection = wanted_set.intersection(offered_set)
            matches.append({
                "profile": p,
                "score": len(intersection) / len(wanted_set) if wanted_set else 0
            })
        
        matches.sort(key=lambda x: x["score"], reverse=True)
        return {"matches": matches}
