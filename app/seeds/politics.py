from app.models import db, Politic
import datetime

def seed_politics():

    pol1 = Politic(nonprofit_id=2, 
    title='Deputy Director of the Office of Management and Budget',
    description='Juan Dixon is expected to be confirmed on Thursday, March 30th. Dixon worked as a Democratic staffer in the U.S. House Appropriations Committee for three years. He is pro-choice, pro-UBI and wants gun reform.',
    question='Do you support Dixon\'s nomination?',
    end_time=datetime.datetime(2021, 3, 30, hour=13, minute=0, second=0))

    pol2 = Politic(nonprofit_id=2, 
    title='Police release name, photo and background story of mass shooter',
    description='Boulder police released information about the shooter who killed 10 people on Monday, March 22. Some people believe that shooter publicization should be minimized to avoid glorification.',
    question='Do you support the Boulder Police Department\'s decision to publicize this information?',
    end_time=datetime.datetime(2021, 3, 31, hour=23, minute=59, second=59))

    pol3 = Politic(nonprofit_id=2, 
    title='Hennepin Co. Municipal Elections',
    description='Municipal elections are Thur, Apr 27.',
    question='Do you plan to vote?',
    end_time=datetime.datetime(2021, 3, 31, hour=23, minute=59, second=59))

    db.session.add(pol1)
    db.session.add(pol2)
    db.session.add(pol3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_politics():
    db.session.execute('TRUNCATE politics CASCADE;')
    db.session.execute("ALTER SEQUENCE politics_id_seq RESTART WITH 1")
    db.session.commit()
