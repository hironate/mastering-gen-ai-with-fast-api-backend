from fastapi import APIRouter, Request

from app.middlewares.auth_middleware import auth_required
from app.schemas.files import (
    AddFileRequest,
    PresignedDownloadRequest,
    PresignedUploadRequest,
)
from app.services.internal.file_upload import FileService
from app.services.external.aws.s3 import S3Client
from app.utils.response_handler import ResponseHandler
from app.core.exceptions.http_exception import BadRequestException

router = APIRouter()
file_service = FileService()
s3_client = S3Client()


@router.post("")
@auth_required()
async def add_file(request: Request, body: AddFileRequest):
    """Add file record to database."""
    db = request.state.db

    user_file_response = file_service.add_file(
        db=db,
        user_id=request.state.user.id,
        type=body.type,
        name=body.name,
        key=body.key,
        size=body.size,
    )
    return ResponseHandler().success_response(
        data=user_file_response.model_dump(mode="json"),
        message="File added to database successfully",
    )


@router.get("/{id}")
@auth_required()
async def get_file(request: Request, id: int):
    """Get file by ID with authorization check."""
    db = request.state.db

    file_response = file_service.get_file_by_id(
        db=db, id=id, user_id=request.state.user.id
    )
    return ResponseHandler().success_response(
        data=file_response.model_dump(mode="json"), message="File found successfully"
    )


@router.post("/presigned-url")
@auth_required()
async def generate_presigned_url(request: Request, body: PresignedUploadRequest):
    response = s3_client.generate_presigned_url(type=body.type)
    return ResponseHandler().success_response(
        data=response, message="Presigned URL generated successfully"
    )


@router.post("/presigned-url/download")
@auth_required()
async def generate_download_url(request: Request, body: PresignedDownloadRequest):
    """Generate presigned URL for S3 download with authorization."""
    db = request.state.db

    file_response = file_service.get_file_by_key(
        db=db, key=body.key, user_id=request.state.user.id
    )
    response = s3_client.generate_download_url(key=file_response.key)

    if not response:
        raise BadRequestException(message="Failed to generate download URL")

    return ResponseHandler().success_response(
        data=response, message="Download URL generated successfully"
    )
