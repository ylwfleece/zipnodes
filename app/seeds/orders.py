from app.models import db, Order

# Adds a demo user, you can add other users here if you want
def seed_orders():

    order1 = Order(nonprofit_id=4, 
    title="Pickup food from Nascent Church",
    description="Pickup food that will be at front door, deliver it to Senior Community Center @ 190 Selinger Way",
    location="230 Intillo Lane", 
    duration=1,
    karma=4,
    virtual=False,
    status="Open")

    order2 = Order(nonprofit_id=3, 
    title="Help stock shelves before pantry opens",
    description="The pantry needs to be stocked before the students show up. Ability to lift 50lbs is a plus.",
    location="120 University Ave", 
    duration=1,
    karma=3,
    virtual=False,
    status="Complete")

    order3 = Order(nonprofit_id=5, 
    title="Attend conference as community member",
    description="Looking for one more community member to complete our conference requirement. (experience necessary)",
    location="500 Marquette Ave", 
    duration=1,
    karma=3,
    virtual=False,
    status="Open")

    order4 = Order(nonprofit_id=2, 
    title="General volunteer event",
    description="Looking for a general volunteer",
    location="100 Somewhere Place", 
    duration=1,
    karma=3,
    virtual=False,
    status="Open")

    order5 = Order(nonprofit_id=7, 
    title="Help pack outreach supply bags",
    description="Looking for someone to help bag snacks and sanitation supplies for outreach workers to distribute",
    location="450 Nipsey Ln", 
    duration=1,
    karma=2,
    virtual=False,
    status="Open")

    order6 = Order(nonprofit_id=8, 
    title="Help pack meals for village in Haiti",
    description="Looking for someone to help pack meals for our latest shipment to Haitian village",
    location="200 Chance Ln", 
    duration=1,
    karma=3,
    virtual=False,
    status="Complete")

    order7 = Order(nonprofit_id=2, 
    title="General volunteer event",
    description="Looking for a general volunteer",
    location="200 Somewhere Place", 
    duration=1,
    karma=4,
    virtual=False,
    status="Open")

    order8 = Order(nonprofit_id=7, 
    title="Help pack outreach supply bags",
    description="Looking for someone to help bag snacks and sanitation supplies for outreach workers to distribute",
    location="450 Nipsey Ln", 
    duration=1,
    karma=2,
    virtual=False,
    status="In Progress")

    order9 = Order(nonprofit_id=8, 
    title="Help pack meals for village in Haiti",
    description="Looking for someone to help pack meals for our latest shipment to Haitian village",
    location="200 Chance Ln", 
    duration=1,
    karma=3,
    virtual=False,
    status="In Progress")

    order10 = Order(nonprofit_id=8, 
    title="Help pack meals for village in Nicaragua",
    description="Looking for someone to help pack meals for our latest shipment to Nicaraguan village",
    location="200 Chance Ln", 
    duration=1,
    karma=3,
    virtual=False,
    status="Open")

    order11 = Order(nonprofit_id=2, 
    title="General volunteer event",
    description="Looking for a general volunteer",
    location="200 Somewhere Place", 
    duration=1,
    karma=4,
    virtual=False,
    status="Open")

    db.session.add(order1)
    db.session.add(order2)
    db.session.add(order3)
    db.session.add(order4)
    db.session.add(order5)
    db.session.add(order6)
    db.session.add(order7)
    db.session.add(order8)
    db.session.add(order9)
    db.session.add(order10)
    db.session.add(order11)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_orders():
    db.session.execute('TRUNCATE orders CASCADE;')
    db.session.execute("ALTER SEQUENCE orders_id_seq RESTART WITH 1")
    db.session.commit()
