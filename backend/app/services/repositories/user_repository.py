from sqlalchemy.exc import IntegrityError
from typing import Optional
from app.schemas.auth_schema import UserCreate, UserResponse
from database.models import User
from app.db.session import get_db
from sqlalchemy.orm import defer, load_only


class UserRepository:
    def __init__(self):
        self._db_gen = get_db()
        self.db = next(self._db_gen)

    def __del__(self):
        if hasattr(self, "_db_gen") and self._db_gen is not None:
            try:
                self._db_gen.close()
            except Exception:
                pass

    def get_user_by_email(
        self,
        email: str,
        attributes: list[str] = [],
        includePassword: bool = False,
    ) -> Optional[User]:
        query = self.db.query(User).filter(User.email == email)
        if len(attributes) > 0:
            query = query.options(load_only(*attributes))
        elif not includePassword:
            query = query.options(defer(User.password_hash, raiseload=True))

        return query.first()

    def get_user_by_id(
        self,
        user_id: int,
        attributes: list[str] = [],
        includePassword: bool = False,
    ) -> Optional[User]:
        query = self.db.query(User).filter(User.id == user_id)
        if len(attributes) > 0:
            query = query.options(load_only(*attributes))
        elif not includePassword:
            query = query.options(defer(User.password_hash, raiseload=True))

        return query.first()

    def create_user(self, user_data: UserCreate, password_hash: str) -> User:
        user = User(
            email=user_data.email,
            password_hash=password_hash,
            full_name=user_data.full_name,
            role=user_data.role,
            is_active=True,
        )

        self.db.add(user)

        try:
            self.db.commit()
            self.db.refresh(user)
            return user

        except IntegrityError:
            self.db.rollback()
            raise ValueError("Email already exists")

    def update_password(self, user_id: int, new_password_hash: str) -> User:
        user = self.get_user_by_id(user_id)
        if not user:
            raise ValueError("User not found")

        user.password_hash = new_password_hash
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_last_login(self, user_id: int) -> bool:
        from datetime import datetime

        result = (
            self.db.query(User)
            .filter(User.id == user_id)
            .update({"last_login_at": datetime.utcnow()})
        )
        self.db.commit()
        return result > 0
