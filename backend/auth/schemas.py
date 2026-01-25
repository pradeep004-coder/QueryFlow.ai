from pydantic import BaseModel, constr

class SignupSchema(BaseModel):
    name: str
    email: str
    password: constr(min_length=6)

class LoginSchema(BaseModel):
    email: str
    password: constr(min_length=6)
