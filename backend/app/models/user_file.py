from sqlalchemy import Column, String, DateTime, ForeignKey, func, Integer
from app.db.session import Base

class UserFile(Base):
    __tablename__ = "user_files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, unique=True, index=True)  # one-to-one
    file_type = Column(String)  # txt, pdf
    file_name = Column(String)  # original name
    file_url = Column(String)   # S3 or R2 path
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
