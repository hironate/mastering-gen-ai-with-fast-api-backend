"""
Base Repository Pattern with Industry Standards

Key Principles:
1. Session injected via dependency injection (not stored in __init__)
2. Use SQLAlchemy 2.0 select() statements
3. Always eager load what you need
4. Return Pydantic schemas, not ORM models (to avoid lazy loading)
5. Let FastAPI manage session lifecycle
"""

from typing import Generic, TypeVar, Type, Optional, List, Any
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete
from sqlalchemy.exc import IntegrityError
from pydantic import BaseModel

# Generic types for ORM Model and Pydantic Schema
ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
    Base repository with CRUD operations following industry standards.
    
    Benefits:
    - No session stored in instance (passed per operation)
    - Type-safe operations
    - Consistent error handling
    - Easy to test and mock
    """

    def __init__(self, model: Type[ModelType]):
        """
        Initialize repository with model class.
        
        Args:
            model: SQLAlchemy model class
        """
        self.model = model

    def get_by_id(
        self,
        db: Session,
        id: int,
        load_options: Optional[List[Any]] = None,
    ) -> Optional[ModelType]:
        """
        Get entity by ID with optional eager loading.
        
        Args:
            db: Database session (injected)
            id: Entity ID
            load_options: List of SQLAlchemy loading options (joinedload, selectinload, etc.)
            
        Returns:
            ORM model instance or None
            
        Note:
            Returns ORM model. Convert to Pydantic in service layer before
            closing session to avoid lazy loading issues.
        """
        stmt = select(self.model).where(self.model.id == id)
        
        if load_options:
            for option in load_options:
                stmt = stmt.options(option)
        
        result = db.execute(stmt)
        return result.scalar_one_or_none()

    def get_by_attribute(
        self,
        db: Session,
        attribute_name: str,
        attribute_value: Any,
        load_options: Optional[List[Any]] = None,
    ) -> Optional[ModelType]:
        """
        Get entity by any attribute.
        
        Args:
            db: Database session
            attribute_name: Name of the model attribute
            attribute_value: Value to search for
            load_options: Loading options for eager loading
            
        Returns:
            ORM model instance or None
        """
        stmt = select(self.model).where(
            getattr(self.model, attribute_name) == attribute_value
        )
        
        if load_options:
            for option in load_options:
                stmt = stmt.options(option)
        
        result = db.execute(stmt)
        return result.scalar_one_or_none()

    def get_multi(
        self,
        db: Session,
        skip: int = 0,
        limit: int = 100,
        load_options: Optional[List[Any]] = None,
    ) -> List[ModelType]:
        """
        Get multiple entities with pagination.
        
        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            load_options: Loading options for eager loading
            
        Returns:
            List of ORM model instances
        """
        stmt = select(self.model).offset(skip).limit(limit)
        
        if load_options:
            for option in load_options:
                stmt = stmt.options(option)
        
        result = db.execute(stmt)
        return list(result.scalars().all())

    def create(
        self,
        db: Session,
        obj_in: CreateSchemaType | dict,
    ) -> ModelType:
        """
        Create new entity.
        
        Args:
            db: Database session
            obj_in: Pydantic schema or dict with entity data
            
        Returns:
            Created ORM model instance
            
        Raises:
            IntegrityError: If unique constraint violated
        """
        if isinstance(obj_in, dict):
            create_data = obj_in
        else:
            create_data = obj_in.model_dump(exclude_unset=True)
        
        db_obj = self.model(**create_data)
        db.add(db_obj)
        
        try:
            db.commit()
            db.refresh(db_obj)
            return db_obj
        except IntegrityError as e:
            db.rollback()
            raise e

    def update(
        self,
        db: Session,
        id: int,
        obj_in: UpdateSchemaType | dict,
    ) -> Optional[ModelType]:
        """
        Update entity by ID.
        
        Args:
            db: Database session
            id: Entity ID
            obj_in: Pydantic schema or dict with update data
            
        Returns:
            Updated ORM model instance or None if not found
        """
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        
        # Remove empty values
        update_data = {k: v for k, v in update_data.items() if v is not None}
        
        if not update_data:
            return self.get_by_id(db, id)
        
        stmt = (
            update(self.model)
            .where(self.model.id == id)
            .values(**update_data)
            .returning(self.model)
        )
        
        result = db.execute(stmt)
        db.commit()
        
        return result.scalar_one_or_none()

    def delete(self, db: Session, id: int) -> bool:
        """
        Delete entity by ID.
        
        Args:
            db: Database session
            id: Entity ID
            
        Returns:
            True if deleted, False if not found
        """
        stmt = delete(self.model).where(self.model.id == id)
        result = db.execute(stmt)
        db.commit()
        
        return result.rowcount > 0

    def exists(self, db: Session, id: int) -> bool:
        """
        Check if entity exists by ID.
        
        Args:
            db: Database session
            id: Entity ID
            
        Returns:
            True if exists, False otherwise
        """
        stmt = select(self.model.id).where(self.model.id == id)
        result = db.execute(stmt)
        return result.scalar_one_or_none() is not None
