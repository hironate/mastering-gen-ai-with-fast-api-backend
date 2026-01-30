from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, func

from app.db.session import Base


class Files(Base):
    __tablename__ = "files"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer, ForeignKey("users.id"), nullable=False, index=True
    )  # one-to-many
    key = Column(String, unique=True, nullable=False, index=True)
    type = Column(String)  # txt, pdf
    name = Column(String)
    size = Column(Integer, nullable=True)
    created_at = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=True,
    )
