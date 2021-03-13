from app.models import db, Order

# Adds a demo user, you can add other users here if you want
def seed_orders():

    order1 = Order(nonprofit_id=4, 
    title="Pick up food from Nascent Church",
    description="Pick up food that will be at front door, deliver it to Senior Community Center @ 190 Selinger Way",
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
    status="Open")

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
    status="Pending")

    order5 = Order(nonprofit_id=7, 
    title="Help pack outreach supply bags",
    description="Looking for someone to help bag snacks and sanitation supplies for outreach workers to distribute",
    location="450 Nipsey Ln", 
    duration=1,
    karma=2,
    virtual=False,
    status="Pending")

    order6 = Order(nonprofit_id=8, 
    title="Help pack meals for village in Haiti",
    description="Looking for someone to help pack meals for our latest shipment to Haitian village",
    location="200 Chance Ln", 
    duration=1,
    karma=3,
    virtual=False,
    status="Complete")

    order7 = Order(nonprofit_id=2, 
    title="Normal volunteer event",
    description="Looking for a normal volunteer",
    location="200 Somewhere Place", 
    duration=1,
    karma=4,
    virtual=False,
    status="Complete")

    order8 = Order(nonprofit_id=7, 
    title="Help pack outreach supply bags",
    description="Looking for someone to help bag snacks and sanitation supplies for outreach workers to distribute",
    location="450 Nipsey Ln", 
    duration=1,
    karma=2,
    virtual=False,
    status="Complete")

    order9 = Order(nonprofit_id=8, 
    title="Help pack meals for village in Haiti",
    description="Looking for someone to help pack meals for our latest shipment to Haitian village",
    location="200 Chance Ln", 
    duration=1,
    karma=3,
    virtual=False,
    status="Complete")

    order10 = Order(nonprofit_id=8, 
    title="Help pack meals for village in Nicaragua",
    description="Looking for someone to help pack meals for our latest shipment to Nicaraguan village",
    location="200 Chance Ln", 
    duration=1,
    karma=3,
    virtual=False,
    status="Open")

    order11 = Order(nonprofit_id=2, 
    title="Regular volunteer event",
    description="Looking for a regular volunteer",
    location="200 Somewhere Place", 
    duration=1,
    karma=4,
    virtual=True,
    status="Complete")

    order12 = Order(nonprofit_id=4, 
    title="Pick up food from Breaking Bread",
    description="Pick up food that will be at front door, deliver it to Senior Community Center @ 190 Selinger Way",
    location="230 Intillo Lane", 
    duration=1,
    karma=4,
    virtual=False,
    status="Open")

    order13 = Order(nonprofit_id=4, 
    title="Pick up food from Seward Co-op",
    description="Pick up food that will be at back door, deliver it to Senior Community Center @ 190 Selinger Way",
    location="390 Cabasi Way", 
    duration=1,
    karma=4,
    virtual=False,
    status="Open")

    order14 = Order(nonprofit_id=4, 
    title="Pick up food from Franklin Community Co-op",
    description="Pick up food that will be in kitchen (ask for Sarah at front desk), deliver it to Nutritious U Food Pantry @ 100 University Ave",
    location="230 Intillo Lane", 
    duration=1,
    karma=4,
    virtual=False,
    status="Open")

    order15 = Order(nonprofit_id=9, 
    title="Tutor group of ninth graders in algebra",
    description="Requires comfort with solving quadratic equations. Registration with Literacy Minnesota required. Must have functional computer camera and microphone for live stream.",
    location="https://zoomlink.lmn/34238", 
    duration=1.5,
    karma=5,
    virtual=True,
    status="Open")

    order16 = Order(nonprofit_id=3, 
    title="Greet students at pantry reception desk (first shift)",
    description="Looking for a someone to greet students during pantry open hours",
    location="100 University Ave", 
    duration=1,
    karma=3,
    virtual=False,
    status="Open")

    order17 = Order(nonprofit_id=3, 
    title="Greet students at pantry reception desk (second shift)",
    description="Looking for a someone to greet students during pantry open hours",
    location="100 University Ave", 
    duration=1,
    karma=3,
    virtual=False,
    status="Open")

    order18 = Order(nonprofit_id=3, 
    title="Greet students at pantry reception desk (third shift)",
    description="Looking for a someone to greet students during pantry open hours",
    location="100 University Ave", 
    duration=1,
    karma=3,
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
    db.session.add(order12)
    db.session.add(order13)
    db.session.add(order14)
    db.session.add(order15)
    db.session.add(order16)
    db.session.add(order17)
    db.session.add(order18)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_orders():
    db.session.execute('TRUNCATE orders CASCADE;')
    db.session.execute("ALTER SEQUENCE orders_id_seq RESTART WITH 1")
    db.session.commit()
