from langchain_openai import ChatOpenAI  # Import the OpenAI class
from app.services.llm.base import BaseLLMProvider  # Import the base class
from typing import List
from langchain.schema import BaseMessage
from app.config.settings import settings

class OpenAILLMProvider(BaseLLMProvider):
    def __init__(self, model_name: str = "gpt-4o"):
        self.model = ChatOpenAI(
            model_name=model_name,
            openai_api_key=settings.OPENAI_API_KEY,
            openai_organization=settings.OPENAI_ORGANIZATION,
            temperature=0.5,
            max_tokens=4096,
            streaming=False
        )

    def generate_response(self, messages: List[BaseMessage]) -> str:
        response = self.model.invoke(messages)
        return response.content

    def get_model_name(self) -> str:
        return f"openai-{self.model.model_name}"  # Return the model name
