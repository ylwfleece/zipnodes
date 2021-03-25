from app.models import db, Project
import datetime

def seed_projects():

    proj1 = Project(nonprofit_id=10, 
    title="Well in Uganda",
    description="Fundraising for a standard well [in a Ugandan village], most residents walk 10-20 miles a day for dirty water.",
    millikarma_per_share=4,
    cost_per_share=0.03,
    total_shares=300000,
    status="Open",
    end_time=datetime.datetime(2021, 3, 30, hour=15, minute=30, second=0))

    proj2 = Project(nonprofit_id=11, 
    title="School in Laos",
    description="Fundraising for a school in a village outside Luang Prubang, 85 percent residents are illiterate.",
    millikarma_per_share=5,
    cost_per_share=0.04,
    total_shares=900000,
    status="Open",
    end_time=datetime.datetime(2021, 3, 31, hour=12, minute=30, second=0))

    proj3 = Project(nonprofit_id=12, 
    title="Sending 1000 nets to Tanzania",
    description="Fundraising for a shipment of 1000 insecticide-treated nets to village outside [].",
    millikarma_per_share=3,
    cost_per_share=0.02,
    total_shares=100000,
    status="Open",
    end_time=datetime.datetime(2021, 4, 6, hour=15, minute=0, second=0))

    proj4 = Project(nonprofit_id=13, 
    title="Fistula Surgery",
    description="Fundraising for one obstetric fistula surgery in [].",
    millikarma_per_share=2,
    cost_per_share=0.05,
    total_shares=120000,
    status="Open",
    end_time=datetime.datetime(2021, 3, 30, hour=15, minute=30, second=0))

    proj5 = Project(nonprofit_id=14, 
    title="Vaccine incentive program in Nigeria",
    description="Fundraising for a vaccine incentive program for residents of [].",
    millikarma_per_share=1,
    cost_per_share=0.01,
    total_shares=200000,
    status="Open",
    end_time=datetime.datetime(2021, 3, 30, hour=15, minute=30, second=0))

    proj6 = Project(nonprofit_id=7, 
    title="Outreach bus token fund",
    description="Raising money for next month's bus tokens for outreach workers to distribute.",
    millikarma_per_share=1,
    cost_per_share=0.02,
    total_shares=115000,
    status="Open",
    end_time=datetime.datetime(2021, 3, 31, hour=15, minute=0, second=0))


    db.session.add(proj1)
    db.session.add(proj2)
    db.session.add(proj3)
    db.session.add(proj4)
    db.session.add(proj5)
    db.session.add(proj6)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_projects():
    db.session.execute('TRUNCATE projects CASCADE;')
    db.session.execute("ALTER SEQUENCE projects_id_seq RESTART WITH 1")
    db.session.commit()
