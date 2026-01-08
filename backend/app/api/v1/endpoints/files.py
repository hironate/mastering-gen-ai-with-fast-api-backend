from fastapi import APIRouter, Request
from app.middlewares.auth_middleware import auth_required
from app.utils.response_handler import ResponseHandler
from app.services.internal.file_upload import FileService
from app.schemas.files import AddFileRequest, GetFileRequest
router = APIRouter()

@router.post("/add")
@auth_required()
async def add_file(request: Request, body: AddFileRequest):
    current_user = request.state.user
    
    user_file = FileService().add_file_to_db(user_id=current_user.id, file_type=body.fileType, file_name=body.fileName, file_key=body.fileKey, file_size=body.fileSize)
    return ResponseHandler().success_response(data=user_file, message="added file to database successfully")

@router.get("/get")
@auth_required()
async def get_file(request: Request, body: GetFileRequest):
    current_user = request.state.user
    file = FileService().get_file_by_key(file_key=body.fileKey)
    return ResponseHandler().success_response(data=file, message="file found successfully")