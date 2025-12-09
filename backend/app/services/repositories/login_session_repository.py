from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from app.models.login_session import LoginSession

class LoginSessionRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_session(self, user_id: str, status: str, failure_reason: Optional[str] = None) -> LoginSession:
        #"""Create a new login session."""
        session = LoginSession(user_id=user_id, status=status, failure_reason=failure_reason)
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def update_logout_time(self, session_id: str) -> bool:
        #"""Update logout time for a session."""
        result = self.db.query(LoginSession).filter(LoginSession.id == session_id).update({"logout_at": datetime.utcnow()})
        
        self.db.commit()
        return result > 0

    def get_sessions_by_user(self, user_id: str) -> List[LoginSession]:
        #"""Get all login sessions for a user."""
        return self.db.query(LoginSession).filter(LoginSession.user_id == user_id).order_by(LoginSession.login_at.desc()).all()

    def get_last_active_session(self, user_id: str) -> Optional[LoginSession]:
        #"""Get the last active login session for a user."""
        return self.db.query(LoginSession).filter(LoginSession.user_id == user_id, LoginSession.logout_at.is_(None)).order_by(LoginSession.login_at.desc()).first()

    def get_session_by_id(self, session_id: str) -> Optional[LoginSession]:
        #"""Get session by ID."""
        return self.db.query(LoginSession).filter(LoginSession.id == session_id).first()
