from pydantic import BaseModel, EmailStr 
from typing import Optional
from datetime import datetime
from app.utils.enum import Role

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str
    role: Role = Role.USER

class UserResponse(UserBase):
    id: int
    is_active: bool
    role: Role
    last_login_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Auth schemas
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    email: Optional[str] = None

# Login schemas
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class PasswordUpdateRequest(BaseModel):
    old_password: str
    new_password: str