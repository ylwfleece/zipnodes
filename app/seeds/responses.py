from app.models import db, Response
import datetime

def seed_responses():

    res1 = Response(node_id=1, 
    politic_id=1,
    answer='Y')

    res2 = Response(node_id=1, 
    politic_id=2,
    answer='N')

    db.session.add(res1)
    db.session.add(res2)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_responses():
    db.session.execute('TRUNCATE responses CASCADE;')
    db.session.execute("ALTER SEQUENCE responses_id_seq RESTART WITH 1")
    db.session.commit()
