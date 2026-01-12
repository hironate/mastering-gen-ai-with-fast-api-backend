from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import Optional
from pydantic import computed_field


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "FastAPI Project"

    ENVIRONMENT: str = "development"

    # CORS
    BACKEND_CORS_ORIGINS: list[str] = ["http://localhost:3000"]

    # JWT
    JWT_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # Cookie
    ACCESS_TOKEN: str = "access_token"

    # OpenAI
    OPENAI_API_KEY: str
    OPENAI_ORGANIZATION: str

    # database
    DB_USERNAME: str = "genai"
    DB_PASSWORD: str = "genai123"
    DB_HOST: str = "postgres"
    DB_NAME: str = "genai_db"
    DB_PORT: int = 5432

    @computed_field
    @property
    def DATABASE_URL(self) -> Optional[str]:
        """Construct DATABASE_URL from individual components if they exist"""
        if all(
            [
                self.DB_USERNAME,
                self.DB_PASSWORD,
                self.DB_HOST,
                self.DB_NAME,
                self.DB_PORT,
            ]
        ):
            return f"postgresql://{self.DB_USERNAME}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

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
