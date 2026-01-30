from langchain.schema import HumanMessage
from langchain_community.document_loaders import TextLoader, PyPDFLoader
from typing import List, Any
import mimetypes
from app.utils.file import prepare_image_messages
import tempfile
import os


def prepare_chat_prompt(prompt: str, files: List[Any] = None) -> List[HumanMessage]:
    """
    Prepares a chat prompt by combining text, PDF content, and image content into a HumanMessage format.

    Args:
        prompt (str): The text question or prompt from the user
        files (List[Any], optional): List of file objects to be processed. Defaults to None.

    Returns:
        List[HumanMessage]: A list containing a single HumanMessage with combined content.
    """
    content = [{"type": "text", "text": f"Question: {prompt}"}]

    if files:
        context = []
        for file in files:
            mime_type = mimetypes.guess_type(file.filename)[0]
            file_content = file.file.read()  # Read the file content directly
            file_info = f"\nFile: {file.filename}\nType: {mime_type}\nSize: {len(file_content)} bytes\n"
            file.file.seek(0)  # Reset file pointer after reading

            if mime_type == "application/pdf":
                # Create a temporary file to store the PDF content
                with tempfile.NamedTemporaryFile(mode="wb", delete=False) as temp_file:
                    temp_file.write(file_content)
                    temp_path = temp_file.name

                try:
                    loader = PyPDFLoader(temp_path)
                    pages = loader.load()
                    context.append(
                        f"{file_info}Content:\n"
                        + "\n".join(
                            f"[Page {i+1}]: {page.page_content}"
                            for i, page in enumerate(pages)
                        )
                    )
                finally:
                    # Clean up the temporary file
                    os.unlink(temp_path)

            elif mime_type and mime_type.startswith("text/"):
                # Create a temporary file to store the content
                with tempfile.NamedTemporaryFile(mode="wb", delete=False) as temp_file:
                    temp_file.write(file_content)
                    temp_path = temp_file.name

                try:
                    loader = TextLoader(temp_path)
                    documents = loader.load()
                    context.append(
                        f"{file_info}Content:\n"
                        + "\n".join(doc.page_content for doc in documents)
                    )
                finally:
                    # Clean up the temporary file
                    os.unlink(temp_path)

            elif mime_type and mime_type.startswith("image/"):
                content.extend(prepare_image_messages([file]))

            else:
                context.append(f"{file_info}Warning: Unsupported file type")

        if context:
            content.append(
                {
                    "type": "text",
                    "text": "Document Context:\n" + "\n---\n".join(context),
                }
            )

    return [HumanMessage(content=content)]
