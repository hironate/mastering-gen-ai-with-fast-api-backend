import base64
from typing import List
from fastapi import UploadFile

def prepare_image_messages(files: List[UploadFile]) -> List[dict]:
    """Convert uploaded files to the format required by the LLM."""
    image_messages = []
    for file in files:
        # Get the MIME type from the content_type or default to jpeg
        mime_type = file.content_type or 'image/jpeg'
        image_base64 = base64.b64encode(file.file.read()).decode('utf-8')
        image_messages.append({
            "type": "image_url",
            "image_url": {"url": f"data:{mime_type};base64,{image_base64}"}
        })
    return image_messages
