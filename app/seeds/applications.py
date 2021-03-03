from app.models import db, Application

# Adds a demo user, you can add other users here if you want
def seed_applications():

    app1 = Application(order_id=1, 
    node_id=1,
    status="Pending")

    db.session.add(app1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_applications():
    db.session.execute('TRUNCATE applications CASCADE;')
    db.session.execute("ALTER SEQUENCE applications_id_seq RESTART WITH 1")
    db.session.commit()
