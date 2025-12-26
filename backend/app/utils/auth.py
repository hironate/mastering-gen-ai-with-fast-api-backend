from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from app.config.settings import settings

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    # """Verify a password against its hash."""
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    # """Hash a password."""
    return pwd_context.hash(password)


def encrypt_token(token: dict) -> str:
    # """Encrypt a token."""
    return jwt.encode(token, settings.JWT_SECRET_KEY, algorithm="HS256")


def decrypt_token(token: str) -> dict:
    # """Decrypt a token."""
    return jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
