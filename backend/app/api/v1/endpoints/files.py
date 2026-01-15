from fastapi import APIRouter, Request, Query
from app.middlewares.auth_middleware import auth_required
from app.utils.response_handler import ResponseHandler
from app.services.internal.file_upload import FileService
from app.schemas.files import AddFileRequest, UserFileResponse

router = APIRouter()


@router.post("/add")
@auth_required()
async def add_file(request: Request, body: AddFileRequest):
    current_user = request.state.user

    user_file = FileService().add_file(
        user_id=current_user.id,
        file_type=body.fileType,
        file_name=body.fileName,
        file_key=body.fileKey,
        file_size=body.fileSize,
    )
    user_file_response = UserFileResponse.model_validate(user_file)
    return ResponseHandler().success_response(
        data=user_file_response.model_dump(mode="json"),
        message="added file to database successfully",
    )


@router.get("/get")
@auth_required()
async def get_file(
    request: Request, file_key: str = Query(..., description="The S3 file key")
):
    current_user = request.state.user
    file = FileService().get_file(file_key=file_key, user_id=current_user.id)
    file_response = UserFileResponse.model_validate(file)
    return ResponseHandler().success_response(
        data=file_response.model_dump(mode="json"), message="file found successfully"
    )
