import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
JWT_SECRET = os.getenv("JWT_SECRET")
AI_API_KEY = os.getenv("AI_API_KEY")
JWT_EXPIRE_DAYS = 3