from langchain_aws import ChatBedrock
from app.services.llm.base import BaseLLMProvider  # Import the base class
from typing import List
from langchain.schema import BaseMessage
from app.config.settings import settings
from langfuse.callback import CallbackHandler

langfuse_handler = CallbackHandler(
    public_key=settings.LANGFUSE_PUBLIC_KEY,
    secret_key=settings.LANGFUSE_SECRET_KEY,
    host="https://cloud.langfuse.com"
)

class BedrockLLMProvider(BaseLLMProvider):
    def __init__(self, model_name: str = "anthropic.claude-3-5-sonnet-20240620-v1:0"):
       self.model = ChatBedrock(
           model_id=model_name,
           aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
           aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
           region_name=settings.AWS_REGION,
           temperature=0.5,
           max_tokens=4096,
           streaming=False
       )
       
    def generate_stream_response(self, messages: List[BaseMessage]):
        response = self.model.stream(messages,config={"callbacks": [langfuse_handler]})
        for chunk in response:
            if chunk.content is not None:
                yield chunk.content

    def generate_response(self, messages: List[BaseMessage]) -> str:
        response = self.model.invoke(messages,config={"callbacks": [langfuse_handler]})
        return response.content

    def get_model_name(self) -> str:
        return f"bedrock-{self.model.model_name}"  # Return the model name