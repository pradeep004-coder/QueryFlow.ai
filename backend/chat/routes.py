from fastapi import APIRouter, Depends, HTTPException, status
from chat.schemas import AskAISchema
from dependencies import get_optional_user, get_current_user
from ai.ai_service import ask_ai
from fastapi.responses import JSONResponse
from database import chats_collection

router = APIRouter()

# Ask AI
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse # Import zaroori hai

@router.post("/ai/ask")
def ask_ai_route(data: AskAISchema, user: dict | None = Depends(get_optional_user)):
    answer = ask_ai(data.question)
    
    if user:
        chats_collection.insert_one({
            "userId": user["_id"],
            "question": data.question,
            "answer": answer,
            "timestamp": data.timestamp
        })
        # Jab data save ho jaye (User logged in)
        return JSONResponse(
            status_code=status.HTTP_201_CREATED,
            content={"answer": answer}
        )
    
    # Normal response (Guest user)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"answer": answer}
    )

# Get chats with pagination
@router.get("/getchats/{offset}")
def get_chats(offset: int, user: dict = Depends(get_current_user)):
    all_chats = list(
        chats_collection
        .find({"userId": user["_id"]})
        .sort("timestamp", -1)
    )

    total = len(all_chats)
    if offset >= total:
        raise HTTPException(status_code=404, detail="No more chats")
  
    start = offset
    end = offset + 10  # slicing end is exclusive

    sliced = all_chats[start:end]

    chats = [
        {
            "question": c["question"],
            "answer": c["answer"],
            "timestamp": c["timestamp"]
        }
        for c in sliced
    ]

    can_load_more = end < total
    return {
        "chats": chats,
        "canLoadMore": can_load_more
    }
