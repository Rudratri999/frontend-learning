"""add attachment table

Revision ID: a40cefc0132b
Revises: fa5a17f6f762
Create Date: 2026-08-03 16:29:28.542213

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a40cefc0132b'
down_revision: Union[str, Sequence[str], None] = 'fa5a17f6f762'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if 'attachment' not in inspector.get_table_names():
        op.create_table(
            'attachment',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('filename', sa.String(), nullable=False),
            sa.Column('file_url', sa.String(), nullable=False),
            sa.Column('public_id', sa.String(), nullable=False),
            sa.Column('file_type', sa.String(), nullable=True),
            sa.Column('uploaded_at', sa.DateTime(), nullable=True),
            sa.Column('task_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['task_id'], ['tasks.id'], ondelete='CASCADE'),
            sa.PrimaryKeyConstraint('id')
        )
    if 'ix_attachment_id' not in [index['name'] for index in inspector.get_indexes('attachment')]:
        op.create_index(op.f('ix_attachment_id'), 'attachment', ['id'], unique=False)


def downgrade() -> None:
    """Downgrade schema."""
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if 'ix_attachment_id' in [index['name'] for index in inspector.get_indexes('attachment')]:
        op.drop_index(op.f('ix_attachment_id'), table_name='attachment')
    if 'attachment' in inspector.get_table_names():
        op.drop_table('attachment')
