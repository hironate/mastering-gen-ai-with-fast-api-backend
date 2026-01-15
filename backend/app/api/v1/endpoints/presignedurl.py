from fastapi import APIRouter, Request
from app.middlewares.auth_middleware import auth_required
from app.schemas.files import PresignedUploadRequest, PresignedDownloadRequest
from app.services.external.aws.s3 import S3Client
from app.utils.response_handler import ResponseHandler
from app.core.exceptions.http_exception import NotFoundException
from app.services.internal.file_upload import FileService

router = APIRouter()


@router.post("")
@auth_required()
async def generate_presigned_url(request: Request, body: PresignedUploadRequest):
    response = S3Client().generate_presigned_url(file_type=body.fileType)

    return ResponseHandler().success_response(
        data=response, message="Presigned URL generated successfully"
    )


@router.post("/download")
@auth_required()
async def generate_download_url(request: Request, body: PresignedDownloadRequest):
    current_user = request.state.user
    file = FileService().get_file(file_key=body.fileKey, user_id=current_user.id)

    response = S3Client().generate_download_url(file_key=file.file_key)
    if not response:
        raise BadRequestException(message="Failed to generate download URL")
    return ResponseHandler().success_response(
        data=response, message="Download URL generated successfully"
    )
