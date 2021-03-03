from werkzeug.security import generate_password_hash
from app.models import db, Node

# Adds a demo user, you can add other users here if you want
def seed_nodes():

    demo = Node(full_name='Demo-lition', email='demo@aa.io',
                password='password', zip_code='55414', karma=0, score=0)

    db.session.add(demo)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_nodes():
    db.session.execute('TRUNCATE nodes CASCADE;')
    db.session.execute("ALTER SEQUENCE nodes_id_seq RESTART WITH 1")
    db.session.commit()
