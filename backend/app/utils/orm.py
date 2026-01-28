"""
ORM to Pydantic conversion helpers.

These utilities help convert ORM models to Pydantic schemas BEFORE the
database session closes, preventing lazy loading issues.

Key Principles:
1. Always convert ORM to Pydantic before session closes
2. Use model_validate() for type-safe conversion
3. Handle None values gracefully
4. Provide clear type hints
"""

from typing import Optional, List, TypeVar, Type
from pydantic import BaseModel
from sqlalchemy.orm import Session

T = TypeVar("T", bound=BaseModel)


def orm_to_pydantic(
    orm_instance: Optional[object],
    pydantic_model: Type[T],
) -> Optional[T]:
    """
    Convert a single ORM instance to Pydantic model.
    
    This function ensures all data is extracted from the ORM instance
    BEFORE returning, preventing lazy loading issues.
    
    Args:
        orm_instance: SQLAlchemy ORM model instance or None
        pydantic_model: Target Pydantic model class
        
    Returns:
        Pydantic model instance or None if input was None
        
    Example:
        ```python
        user_orm = user_repo.get_user_by_id(db, user_id)
        user_response = orm_to_pydantic(user_orm, UserResponse)
        # Now safe to close session - all data is in Pydantic model
        ```
    """
    if orm_instance is None:
        return None
    
    return pydantic_model.model_validate(orm_instance)


def orm_list_to_pydantic(
    orm_instances: List[object],
    pydantic_model: Type[T],
) -> List[T]:
    """
    Convert a list of ORM instances to Pydantic models.
    
    Args:
        orm_instances: List of SQLAlchemy ORM model instances
        pydantic_model: Target Pydantic model class
        
    Returns:
        List of Pydantic model instances
        
    Example:
        ```python
        users_orm = user_repo.get_active_users(db, skip=0, limit=10)
        users_response = orm_list_to_pydantic(users_orm, UserResponse)
        # Safe to close session
        ```
    """
    return [pydantic_model.model_validate(instance) for instance in orm_instances]


def safe_orm_to_dict(orm_instance: object) -> dict:
    """
    Convert ORM instance to dictionary safely.
    
    This extracts all loaded attributes without triggering lazy loading.
    
    Args:
        orm_instance: SQLAlchemy ORM model instance
        
    Returns:
        Dictionary of loaded attributes
        
    Note:
        Only includes attributes that are already loaded.
        Does NOT trigger lazy loading for deferred columns.
    """
    from sqlalchemy import inspect
    
    # Get the instance state
    state = inspect(orm_instance)
    
    # Get all loaded attributes (won't trigger lazy loading)
    result = {}
    for attr in state.attrs:
        # Only include loaded attributes
        if attr.loaded_value is not attr.value:
            result[attr.key] = attr.value
    
    return result


class RepositoryHelper:
    """
    Helper class to encapsulate common repository + ORM to Pydantic patterns.
    
    Use this in service layers to ensure proper conversion.
    """
    
    @staticmethod
    def get_one_or_none(
        db: Session,
        repository_method,
        pydantic_model: Type[T],
        *args,
        **kwargs,
    ) -> Optional[T]:
        """
        Execute repository method and convert result to Pydantic.
        
        Args:
            db: Database session
            repository_method: Repository method to call
            pydantic_model: Target Pydantic model
            *args: Positional arguments for repository method
            **kwargs: Keyword arguments for repository method
            
        Returns:
            Pydantic model instance or None
            
        Example:
            ```python
            user = RepositoryHelper.get_one_or_none(
                db,
                user_repo.get_user_by_email,
                UserResponse,
                email="test@example.com"
            )
            ```
        """
        orm_instance = repository_method(db, *args, **kwargs)
        return orm_to_pydantic(orm_instance, pydantic_model)
    
    @staticmethod
    def get_many(
        db: Session,
        repository_method,
        pydantic_model: Type[T],
        *args,
        **kwargs,
    ) -> List[T]:
        """
        Execute repository method and convert list result to Pydantic.
        
        Args:
            db: Database session
            repository_method: Repository method to call
            pydantic_model: Target Pydantic model
            *args: Positional arguments for repository method
            **kwargs: Keyword arguments for repository method
            
        Returns:
            List of Pydantic model instances
            
        Example:
            ```python
            users = RepositoryHelper.get_many(
                db,
                user_repo.get_active_users,
                UserResponse,
                skip=0,
                limit=10
            )
            ```
        """
        orm_instances = repository_method(db, *args, **kwargs)
        return orm_list_to_pydantic(orm_instances, pydantic_model)


def ensure_loaded(orm_instance: object, *attributes: str) -> None:
    """
    Ensure specific attributes are loaded before accessing.
    
    This is useful when you want to explicitly load certain attributes
    before converting to Pydantic or returning from a function.
    
    Args:
        orm_instance: SQLAlchemy ORM model instance
        *attributes: Attribute names to check
        
    Raises:
        AttributeError: If any attribute is not loaded
        
    Example:
        ```python
        user = user_repo.get_user_by_id(db, user_id)
        ensure_loaded(user, 'email', 'name', 'role')
        # Now safe to access these attributes
        ```
    """
    from sqlalchemy import inspect
    
    state = inspect(orm_instance)
    
    for attr_name in attributes:
        if attr_name not in state.attrs:
            raise AttributeError(f"Attribute '{attr_name}' does not exist on model")
        
        attr = state.attrs[attr_name]
        if attr.loaded_value is attr.value:
            raise AttributeError(
                f"Attribute '{attr_name}' is not loaded. "
                "This would trigger a lazy load query."
            )
