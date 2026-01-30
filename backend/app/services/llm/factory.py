from typing import Dict, Type
from app.services.llm.providers.openai_provider import OpenAILLMProvider
from app.services.llm.providers.bedrock_provider import BedrockLLMProvider 
from app.services.llm.base import BaseLLMProvider
from app.utils.models import get_model_config

class LLMFactory:
    _providers: Dict[str, Type[BaseLLMProvider]] = {
        "bedrock-claude": BedrockLLMProvider,
        "openai": OpenAILLMProvider
    }

    @classmethod
    def get_provider_for_model(cls, user_model: str) -> BaseLLMProvider:
        """
        Get LLM provider instance for a user-friendly model name.
        
        Args:
            user_model: User-friendly model name (e.g., "sonnet-4.5", "gpt-4o")
            
        Returns:
            Configured BaseLLMProvider instance
            
        Raises:
            ValueError: If model or provider is not found
        """
        # Get model configuration from mapping
        model_config = get_model_config(user_model)
        
        # Get provider class
        if model_config.provider not in cls._providers:
            raise ValueError(f"Unknown provider: {model_config.provider}")
        
        provider_class = cls._providers[model_config.provider]
        
        # Return provider instance with the actual model name
        return provider_class(model_name=model_config.model_name)  # type: ignore