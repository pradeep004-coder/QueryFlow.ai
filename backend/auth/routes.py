from fastapi import APIRouter, HTTPException
from auth.schemas import SignupSchema, LoginSchema
from auth.utils import create_token
from database import users_collection
from datetime import datetime

router = APIRouter()

@router.post("/signup")
def signup(data: SignupSchema):
    if users_collection.find_one({"email": data.email}):
        raise HTTPException(status_code=409, detail="Email already registered")
    
    result = users_collection.insert_one({
        "name": data.name,
        "email": data.email,
        "password": data.password
    })
    
    token = create_token(result.inserted_id)
    return {"token": token}

@router.post("/login")
def login(data: LoginSchema):
    user = users_collection.find_one({"email": data.email})
    if not user :
        raise HTTPException(status_code=404, detail="User not registered")
    
    if data.password != user["password"]:
        raise HTTPException(status_code=401, detail="Incorrect password")
    
    token = create_token(str(user["_id"]))
    return {"token": token}
