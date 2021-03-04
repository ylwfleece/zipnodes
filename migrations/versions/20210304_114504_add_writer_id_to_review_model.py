"""Add writer_id to review model

Revision ID: c3bde6113cb6
Revises: 863d690115ac
Create Date: 2021-03-04 11:45:04.064615

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c3bde6113cb6'
down_revision = '863d690115ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('reviews', sa.Column('writer_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'reviews', 'users', ['writer_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'reviews', type_='foreignkey')
    op.drop_column('reviews', 'writer_id')
    # ### end Alembic commands ###
