from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from app.middlewares.auth_middleware import auth_required
from app.schemas.chat_schema import ChatRequest
from app.utils.response_handler import ResponseHandler
from app.services.llm.factory import LLMFactory
from app.core.exceptions.http_exception import BadRequestException, ForbiddenException
from app.services.prompts.chat import prepare_chat_prompt
from app.services.prompts.assistant import prepare_assistant_prompt

router = APIRouter()
response_handler = ResponseHandler()


@router.post("/")
@auth_required(roles=["ADMIN"])
async def create_chat(
    request: Request, chat_request: ChatRequest = Depends(ChatRequest.as_form)
):
    """Create a chat completion with optional streaming."""
    try:
        llm_provider = LLMFactory.get_provider(chat_request.model)
    
        # Determine prompt type based on input
        if chat_request.data:
            messages = prepare_assistant_prompt(chat_request.prompt, chat_request.data)
        else:
            messages = prepare_chat_prompt(chat_request.prompt, chat_request.files)

        if chat_request.stream:
            # For streaming responses, return StreamingResponse directly
            # (streaming responses have their own format)
            return StreamingResponse(
                llm_provider.generate_stream_response(messages),
                media_type="text/event-stream",
            )

        ai_response = llm_provider.generate_response(messages)
        return response_handler.success_response(
            data={"response": ai_response},
            message="Chat response generated successfully",
        )
    except (BadRequestException, ForbiddenException) as e:
        raise e
