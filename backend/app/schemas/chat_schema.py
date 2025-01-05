from pydantic import BaseModel, field_validator
from fastapi import Form, UploadFile, File
from typing import Optional

class ChatRequest(BaseModel):
    prompt: str
    data: str
    model: str = "bedrock-claude"
    files: Optional[list[UploadFile]] = None
    stream: bool = True

    @classmethod
    def as_form(
        cls,
        prompt: str = Form(...),
        data: str = Form(...),
        model: str = Form("bedrock-claude"),
        files: list[UploadFile] = None,
        stream: bool = Form(True)
    ):
        return cls(
            prompt=prompt,
            data=data,
            model=model,
            files=files,
            stream=stream
        )

    @field_validator('model')
    def validate_model(cls, value):
        allowed_models = ["bedrock-claude", "openai-gpt-4o"]
        if value not in allowed_models:
            raise ValueError(f"Model must be one of {allowed_models}")
        return value

    @field_validator('files')
    def validate_file_type(cls, files):
        if files:
            allowed_types = ['image/jpeg', 'image/png', 'text/plain', 'application/pdf']
            for file in files:
                content_type = file.content_type
                if content_type not in allowed_types:
                    raise ValueError(f"File type must be one of {allowed_types}. Got {content_type}")
        return files

class ChatResponse(BaseModel):
    results: dict
