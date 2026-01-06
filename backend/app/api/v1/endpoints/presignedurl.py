from fastapi import APIRouter, Request
from app.middlewares.auth_middleware import auth_required
from app.services.internal.file_upload import FileService
from app.schemas.files import PresignedUploadRequest,PresignedDownloadRequest
from app.services.external.aws.s3 import S3Client
from app.utils.response_handler import ResponseHandler

router = APIRouter()

@router.post("")
@auth_required()
async def generate_presigned_url(request: Request, body: PresignedUploadRequest):
    current_user = request.state.user   
    file_upload_validator = FileService().validate(file_type=body.fileType, file_size=body.fileSize) # validate file type and size
    
    response = S3Client().generate_presigned_url(file_type=body.fileType)

    return ResponseHandler().success_response(data=response, message="Presigned URL generated successfully")

@router.post("/download")
@auth_required()
async def generate_download_url(request:Request, body:PresignedDownloadRequest):
    current_user = request.state.user

    response = S3Client().generate_download_url(file_key=body.fileKey)

    return ResponseHandler().success_response(data=response, message="Presigned URL generated successfully")
