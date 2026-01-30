from langchain_openai import ChatOpenAI  # Import the OpenAI class
from app.services.llm.base import BaseLLMProvider  # Import the base class
from typing import Sequence, Generator
from langchain_core.messages import BaseMessage
from langchain_core.callbacks import CallbackManager
from langfuse.langchain import CallbackHandler
from app.config.settings import settings
from pydantic import SecretStr

class OpenAILLMProvider(BaseLLMProvider):
    def __init__(self, model_name: str = "gpt-4o"):
        self.model_name = model_name
        
        # Initialize LangFuse callback handler if credentials are provided
        callbacks = []
        if settings.LANGFUSE_PUBLIC_KEY and settings.LANGFUSE_SECRET_KEY:
            # In Langfuse v3, CallbackHandler reads config from environment variables
            langfuse_handler = CallbackHandler()
            callbacks.append(langfuse_handler)
        
        callback_manager = CallbackManager(callbacks) if callbacks else None
        
        self.model = ChatOpenAI(
            model=model_name,
            api_key=SecretStr(settings.OPENAI_API_KEY) if settings.OPENAI_API_KEY else None,
            temperature=0.5,
            streaming=False,
            callbacks=callback_manager,
        )
        
    def generate_stream_response(self, messages: Sequence[BaseMessage]) -> Generator[str, None, None]:
        response = self.model.stream(messages)
        for chunk in response:
            if chunk.content is not None:
                content = chunk.content
                # Handle different content types
                if isinstance(content, str):
                    yield content
                elif isinstance(content, list):
                    yield str(content)

    def generate_response(self, messages: Sequence[BaseMessage]) -> str:
        response = self.model.invoke(messages)
        content = response.content
        # Ensure we always return a string
        if isinstance(content, str):
            return content
        elif isinstance(content, list):
            return str(content)
        else:
            return str(content)

    def get_model_name(self) -> str:
        return f"openai-{self.model_name}"
