"""
Model mapping constants for user-friendly model names to provider and actual model names.
"""

from typing import Dict, NamedTuple


class ModelConfig(NamedTuple):
    """Configuration for a model including provider and actual model name"""
    provider: str
    model_name: str
    display_name: str


# User-friendly model name to provider and actual model name mapping
MODEL_MAPPINGS: Dict[str, ModelConfig] = {
    "sonnet-4.5": ModelConfig(
        provider="bedrock-claude",
        model_name="global.anthropic.claude-sonnet-4-5-20250929-v1:0",
        display_name="Claude Sonnet 4.5"
    ),
    "gpt-4o": ModelConfig(
        provider="openai",
        model_name="gpt-4o",
        display_name="GPT-4o"
    ),
    "gpt-5": ModelConfig(
        provider="openai",
        model_name="gpt-5",
        display_name="GPT-5"
    ),
    "gpt-5.1": ModelConfig(
        provider="openai",
        model_name="gpt-5.1",
        display_name="GPT-5.1"
    ),
    "gpt-5.2": ModelConfig(
        provider="openai",
        model_name="gpt-5.2",
        display_name="GPT-5.2"
    ),
}


def get_model_config(user_model: str) -> ModelConfig:
    """
    Get model configuration from user-friendly model name.
    
    Args:
        user_model: User-friendly model name (e.g., "sonnet-4.5", "gpt-4o")
        
    Returns:
        ModelConfig with provider and actual model name
        
    Raises:
        ValueError: If model is not found in mappings
    """
    if user_model not in MODEL_MAPPINGS:
        available_models = ", ".join(MODEL_MAPPINGS.keys())
        raise ValueError(
            f"Unknown model: {user_model}. Available models: {available_models}"
        )
    return MODEL_MAPPINGS[user_model]


def get_available_models() -> list[str]:
    """Get list of available user-friendly model names"""
    return list(MODEL_MAPPINGS.keys())

