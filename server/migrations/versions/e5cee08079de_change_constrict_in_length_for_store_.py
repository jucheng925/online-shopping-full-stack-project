"""change constrict in length for store name

Revision ID: e5cee08079de
Revises: 59758a46d49b
Create Date: 2024-01-28 13:05:12.272082

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e5cee08079de'
down_revision = '59758a46d49b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.alter_column('store_name',
               existing_type=sa.VARCHAR(length=15),
               type_=sa.String(length=20),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.alter_column('store_name',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=15),
               existing_nullable=False)

    # ### end Alembic commands ###
