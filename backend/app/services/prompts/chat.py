from langchain.schema import HumanMessage
from typing import List, Any
from app.utils.file_handler import prepare_image_messages

def prepare_chat_prompt(prompt: str, files: List[Any] = None) -> List[HumanMessage]:
    """
    Prepares a chat prompt by combining text and optional image content into a HumanMessage format.

    Args:
        prompt (str): The text question or prompt from the user
        files (List[Any], optional): List of file objects to be processed as images. Defaults to None.

    Returns:
        List[HumanMessage]: A list containing a single HumanMessage with combined text and image content.
    """
    content = [{"type": "text", "text": f"Question: {prompt}"}]
    
    if files:
        content.extend(prepare_image_messages(files))
    
    return [HumanMessage(content=content)]