from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
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

class LoginResponse(BaseModel):
    user: UserResponse
    access_token: str
    token_type: str = "bearer"

# Session schemas
class LoginSessionResponse(BaseModel):
    id: int
    user_id: int
    login_at: datetime
    logout_at: Optional[datetime] = None
    status: str
    failure_reason: Optional[str] = None

    class Config:
        from_attributes = True

class PasswordUpdateRequest(BaseModel):
    old_password: str
    new_password: str

class AuthenticatedUser(BaseModel):
    id: int
    username: Optional[str] = None
    email: EmailStr

