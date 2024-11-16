from abc import ABC, abstractmethod
from typing import List
from langchain.schema import BaseMessage

class BaseLLMProvider(ABC):
    @abstractmethod
    def generate_response(self, messages: List[BaseMessage]) -> str:
        pass

    @abstractmethod
    def get_model_name(self) -> str:
        pass