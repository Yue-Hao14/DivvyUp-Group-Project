from app.models import db, Expense, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
from datetime import date
import random

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_expenses():
    expense1 = Expense(
        description=fake.sentence(),
        amount=33.33,
        payer_id=1,
        expense_date=date.fromisoformat("2022-02-14"),
    )
    expense2 = Expense(
        description=fake.sentence(),
        amount=66.66,
        payer_id=2,
        expense_date=date.fromisoformat("2022-01-24"),
    )
    expense3 = Expense(
        description=fake.sentence(),
        amount=99.99,
        payer_id=3,
        expense_date=date.fromisoformat("2021-01-31"),
    )
    expense4 = Expense(
        description=fake.sentence(),
        amount=133.32,
        payer_id=1,
        expense_date=date.fromisoformat(fake.date()),
    )

    db.session.add_all([expense1, expense2, expense3, expense4])
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expenses"))

    db.session.commit()
