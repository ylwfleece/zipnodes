from app.models import db, Purchase
import datetime

def seed_purchases():

    pur1 = Purchase(node_id=1, 
    project_id=1,
    num_shares=10)

    pur2 = Purchase(node_id=1, 
    project_id=2,
    num_shares=100)

    db.session.add(pur1)
    db.session.add(pur2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_purchases():
    db.session.execute('TRUNCATE purchases CASCADE;')
    db.session.execute("ALTER SEQUENCE purchases_id_seq RESTART WITH 1")
    db.session.commit()
