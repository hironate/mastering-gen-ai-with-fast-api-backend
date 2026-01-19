from fastapi import APIRouter, Query, Request

from app.middlewares.auth_middleware import auth_required
from app.schemas.files import AddFileRequest, UserFileResponse
from app.services.internal.file_upload import FileService
from app.utils.response_handler import ResponseHandler

router = APIRouter()


@router.post("")
@auth_required()
async def add_file(request: Request, body: AddFileRequest):
    current_user = request.state.user

    user_file = FileService().add_file(
        user_id=current_user.id,
        type=body.type,
        name=body.name,
        key=body.key,
        size=body.size,
    )
    user_file_response = UserFileResponse.model_validate(user_file)
    return ResponseHandler().success_response(
        data=user_file_response.model_dump(mode="json"),
        message="added file to database successfully",
    )


@router.get("/{id}")
@auth_required()
async def get_file(request: Request, id: int):
    current_user = request.state.user
    file = FileService().get_file(id=id, user_id=current_user.id)
    file_response = UserFileResponse.model_validate(file)
    return ResponseHandler().success_response(
        data=file_response.model_dump(mode="json"), message="File found successfully"
    )
