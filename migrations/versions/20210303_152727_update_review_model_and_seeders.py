"""Update Review model and seeders

Revision ID: 863d690115ac
Revises: 4935885d1990
Create Date: 2021-03-03 15:27:27.539381

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '863d690115ac'
down_revision = '4935885d1990'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('application_id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=225), nullable=False),
    sa.Column('score', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['application_id'], ['applications.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    # ### end Alembic commands ###
