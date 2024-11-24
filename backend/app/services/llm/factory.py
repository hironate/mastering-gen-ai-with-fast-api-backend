from typing import Dict, Type
from app.services.llm.providers.openai_provider import OpenAILLMProvider
from app.services.llm.providers.bedrock_provider import BedrockLLMProvider 
from app.services.llm.base import BaseLLMProvider

class LLMFactory:
    _providers: Dict[str, Type[BaseLLMProvider]] = {
        "bedrock-claude": BedrockLLMProvider,
        "openai-gpt4": OpenAILLMProvider
    }

    @classmethod
    def get_provider(cls, provider_id: str) -> BaseLLMProvider:
        if provider_id not in cls._providers:
            raise ValueError(f"Unknown provider: {provider_id}")
        
        provider_class = cls._providers[provider_id]
        
        if provider_id == "bedrock-claude":
            return provider_class()
        elif provider_id == "openai-gpt4":
            return provider_class(model_name="gpt-4")
        
        return provider_class()