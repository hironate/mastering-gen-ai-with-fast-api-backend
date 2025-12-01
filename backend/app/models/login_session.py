from sqlalchemy import Column, String, DateTime, ForeignKey, func, Integer
from app.db.session import Base

class LoginSession(Base):
    __tablename__ = "login_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    login_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    logout_at = Column(DateTime(timezone=True))
    status = Column(String, nullable=False)  # 'success' | 'failed'
    failure_reason = Column(String)
