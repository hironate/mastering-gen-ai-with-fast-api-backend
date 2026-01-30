"""create files table

Revision ID: dfdbe9975fa7
Revises: 0297135e6454
Create Date: 2025-12-04 15:46:47.145794

"""

from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "dfdbe9975fa7"
down_revision: Union[str, None] = "0297135e6454"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "files",
        sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("key", sa.String(), nullable=False),
        sa.Column("type", sa.String(), nullable=True),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("size", sa.Integer(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            nullable=True,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.func.now(),
            onupdate=sa.func.now(),
            nullable=True,
        ),
    )
    op.create_index(
        op.f("ix_files_user_id"), "files", ["user_id"], unique=False
    )
    op.create_index(op.f("ix_files_key"), "files", ["key"], unique=True)


def downgrade() -> None:
    op.drop_index(op.f("ix_files_key"), table_name="files")
    op.drop_index(op.f("ix_files_user_id"), table_name="files")
    op.drop_table("files")
