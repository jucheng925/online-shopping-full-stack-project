"""add image column to stores table

Revision ID: c122517d2a6e
Revises: eb7a3f543df4
Create Date: 2024-01-28 16:21:50.705176

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c122517d2a6e'
down_revision = 'eb7a3f543df4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.drop_column('image')

    # ### end Alembic commands ###
