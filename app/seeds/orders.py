from app.models import db, Order

# Adds a demo user, you can add other users here if you want
def seed_orders():

    order1 = Order(nonprofit_id=1, 
    title="Pickup food from Nascent Church",
    description="Pickup food that will be at front door, deliver it to Senior Community Center @ 190 Selinger Way",
    location="230 Intillo Lane", 
    duration=1,
    karma=5,
    virtual=False,
    status="Unfilled")

    db.session.add(order1)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_orders():
    db.session.execute('TRUNCATE orders CASCADE;')
    db.session.execute("ALTER SEQUENCE orders_id_seq RESTART WITH 1")
    db.session.commit()
