"""create login_session table

Revision ID: 8a00e021c4df
Revises: 0297135e6454
Create Date: 2025-12-01 08:42:09.752826

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8a00e021c4df'
down_revision: Union[str, None] = '0297135e6454'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'login_sessions',
        sa.Column('id', sa.Integer(), autoincrement=True, primary_key=True, index=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.id'), nullable=False, index=True),
        sa.Column('login_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('logout_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('status', sa.String(), nullable=False),
        sa.Column('failure_reason', sa.String(), nullable=True)
    )


def downgrade() -> None:
    op.drop_table('login_sessions')
