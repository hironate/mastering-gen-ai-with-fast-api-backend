from pydantic import BaseModel, field_validator

class ChatRequest(BaseModel):
    prompt: str
    data: str
    model: str = "bedrock-claude"
    stream: bool = True

    @field_validator('model')
    def validate_model(cls, value):
        allowed_models = ["bedrock-claude", "another-model"]
        if value not in allowed_models:
            raise ValueError(f"Model must be one of {allowed_models}")
        return value

class ChatResponse(BaseModel):
    results: dict
