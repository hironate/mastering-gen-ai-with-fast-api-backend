"""create users table

Revision ID: 0297135e6454
Revises: 
Create Date: 2025-11-30 20:56:37.857462

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from app.utils.enum import Role

# revision identifiers, used by Alembic.
revision: str = '0297135e6454'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:

    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), autoincrement=True, primary_key=True, index=True),
        sa.Column('email', sa.String(), unique=True, nullable=False),
        sa.Column('password_hash', sa.String(), nullable=False),
        sa.Column('name', sa.String(), nullable=True),
        sa.Column('role', sa.Enum(Role, name='role'), nullable=False, default='USER'),
        sa.Column('is_active', sa.Boolean(), default=True),
        sa.Column('last_login_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), onupdate=sa.text('now()'), nullable=False)
    )

def downgrade() -> None:
    op.drop_table('users')