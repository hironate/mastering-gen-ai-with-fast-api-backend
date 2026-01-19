import time
import uuid

import boto3
from botocore.exceptions import ClientError
from loguru import logger

from app.config.settings import settings
from app.core.exceptions.http_exception import BadRequestException
from app.utils.file import expiration_time, get_file_extension


class S3Client:
    def __init__(self):
        self.session = boto3.session.Session()
        self.s3_client = self.session.client(
            "s3",
            endpoint_url=settings.AWS_ENDPOINT_URL,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name="auto",
        )
        self.bucket_name = settings.AWS_S3_BUCKET_NAME

    def generate_presigned_url(self, type: str, expiration: int = expiration_time):
        # """Generate a pre-signed URL for uploading a file to S3."""
        extension = get_file_extension(type)
        s3_file_key = (
            f"user/documents/{time.time()}-{uuid.uuid4()}{extension}"  # Unique S3 key
        )
        try:
            presigned_url = self.s3_client.generate_presigned_url(
                "put_object",
                Params={
                    "Bucket": self.bucket_name,
                    "Key": s3_file_key,
                    "ContentType": type,
                },
                ExpiresIn=expiration,
            )
            return {
                "presigned_url": presigned_url,
                "key": s3_file_key,
                "bucket": self.bucket_name,
            }
        except ClientError as e:
            logger.error(f"Error generating pre-signed upload URL: {e}")
            raise BadRequestException(
                message=f"Error generating pre-signed upload URL: {e}"
            )

    def generate_download_url(self, key: str, expiration: int = expiration_time):
        # """Generate a pre-signed URL for downloading a file from S3."""
        try:
            presigned_url = self.s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": key},
                ExpiresIn=expiration,
            )
            return {
                "presigned_url": presigned_url,
                "key": key,
                "bucket": self.bucket_name,
            }

        except ClientError as e:
            logger.error(f"Error generating pre-signed download URL: {e}")
            return None
