from sqlalchemy import Column, String, DateTime, ForeignKey, func, Integer
from app.db.session import Base

class UserFile(Base):
    __tablename__ = "user_files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)    # one-to-many
    file_key = Column(String, unique=True, nullable=False, index=True)
    file_type = Column(String)  # txt, pdf
    file_name = Column(String)
    file_size = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

