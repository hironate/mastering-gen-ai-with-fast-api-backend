from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional, Union


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI Project"

    # Database
    DATABASE_URL: str

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    # JWT
    JWT_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    ENVIRONMENT: str = "development"

    # Cookie
    ACCESS_TOKEN: str = "access_token"

    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_ORGANIZATION: str

    # AWS
    AWS_ACCESS_KEY_ID: str = "your_default_access_key_id"
    AWS_SECRET_ACCESS_KEY: str
    AWS_REGION: str = "us-east-1"
    AWS_S3_BUCKET_NAME: str = "your-s3-bucket-name"
    AWS_ENDPOINT_URL: str

    class Config:
        case_sensitive = True
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
