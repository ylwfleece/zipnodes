from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    demo_node = User(username='Node Demo', email='node_demo@aa.io',
                password='password', zip_code='55414', karma=0, score=0, nonprofit=False)
    demo_nonprofit = User(username='Nonprofit Demo', email='np_demo@aa.io',
                password='password', zip_code='55414', karma=0, score=0, nonprofit=True)
    nu = User(username="Nutritious U Food Pantry", email='nu@aa.io', 
                password='password', zip_code='55414', karma=0, score=0, nonprofit=True)
    tcfj = User(username="TC Food Justice", email='tcfj@aa.io', 
                password='password', zip_code='55414', karma=0, score=0, nonprofit=True)
    rjca = User(username="Restorative Justice Community Action", email='rjca@aa.io', 
                password='password', zip_code='55414', karma=0, score=0, nonprofit=True)
    js = User(username="Joe Shmo", email='js@aa.io',
                password='password', zip_code='55414', karma=0, score=0, nonprofit=False)
    sw = User(username="Streetworks", email='sw@aa.io',
                password='password', zip_code='55414', karma=0, score=0, nonprofit=True)
    fmsc = User(username="Feed My Starving Children", email='fmsc@aa.io',
                password='password', zip_code='55414', karma=0, score=0, nonprofit=True)
    

    db.session.add(demo_node)
    db.session.add(demo_nonprofit)
    db.session.add(nu)
    db.session.add(tcfj)
    db.session.add(rjca)
    db.session.add(js)
    db.session.add(sw)
    db.session.add(fmsc)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.execute("ALTER SEQUENCE users_id_seq RESTART WITH 1")
    db.session.commit()