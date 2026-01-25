from pydantic import BaseModel

class AskAISchema(BaseModel):
    question: str
    timestamp: int  # ISO string or client-provided
