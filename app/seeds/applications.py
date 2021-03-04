from app.models import db, Application

# Adds a demo user, you can add other users here if you want
def seed_applications():

    app1 = Application(order_id=1, 
    node_id=1)
    app2 = Application(order_id=2, 
    node_id=1)
    app3 = Application(order_id=3, 
    node_id=1)

    db.session.add(app1)
    db.session.add(app2)
    db.session.add(app3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_applications():
    db.session.execute('TRUNCATE applications CASCADE;')
    db.session.execute("ALTER SEQUENCE applications_id_seq RESTART WITH 1")
    db.session.commit()
