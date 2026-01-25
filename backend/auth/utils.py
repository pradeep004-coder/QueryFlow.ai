import jwt
import datetime
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET_KEY")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password
def hash_password(password: str):
    return pwd_context.hash(password)

# Verify password
def verify_password(password: str, hashed: str):
    return pwd_context.verify(password, hashed)

# Create JWT token (3 days expiry)
def create_token(user_id: str):
    payload = {
        "user_id": str(user_id),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=3)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm="HS256")
    return token

# Verify JWT token
def decode_token(token: str):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
