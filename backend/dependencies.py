from fastapi import HTTPException, Header
from auth.utils import decode_token
from database import users_collection
from bson import ObjectId

def get_optional_user(authorization: str = Header(None)):
    if not authorization:
        return None
    
    token = authorization.split(" ")[1] if " " in authorization else authorization
    payload = decode_token(token)
    if not payload:
        return None
    
    user = users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    if not user:
        return None
    return user

def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token missing")
    
    token = authorization.split(" ")[1] if " " in authorization else authorization
    payload = decode_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    
    user = users_collection.find_one({"_id": ObjectId(payload["user_id"])})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user