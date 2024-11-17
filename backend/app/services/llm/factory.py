from app.services.llm.providers.openai_provider import OpenAILLMProvider
from app.services.llm.providers.bedrock_provider import BedrockLLMProvider
from app.services.llm.base import BaseLLMProvider

class LLMFactory:
    provider_map = {
        "openai": OpenAILLMProvider,
        "bedrock": BedrockLLMProvider
    }

    @staticmethod
    def get_llm_provider(provider_type: str, model_name: str) -> BaseLLMProvider:
        if provider_type in LLMFactory.provider_map:
            return LLMFactory.provider_map[provider_type](model_name)
        else:
            raise ValueError(f"Unknown provider type: {provider_type}")

# Example usage:
# llm_provider = LLMFactory.get_llm_provider("openai", "gpt-4o")
