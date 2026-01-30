from abc import ABC, abstractmethod
from typing import Sequence, Generator
from langchain_core.messages import BaseMessage

class BaseLLMProvider(ABC):
    @abstractmethod
    def generate_response(self, messages: Sequence[BaseMessage]) -> str:
        pass

    @abstractmethod
    def generate_stream_response(self, messages: Sequence[BaseMessage]) -> Generator[str, None, None]:
        pass

    @abstractmethod
    def get_model_name(self) -> str:
        pass