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
        amount=round(random.uniform(33.33, 66.66), 2),
        payer_id=1,
        expense_date=date.fromisoformat(fake.date()),
        split_method="even",
        is_settled=True,
        settled_date=date.fromisoformat(fake.date()),
    )
    expense2 = Expense(
        description=fake.sentence(),
        amount=round(random.uniform(33.33, 66.66), 2),
        payer_id=2,
        expense_date=date.fromisoformat(fake.date()),
        split_method="even",
    )
    expense3 = Expense(
        description=fake.sentence(),
        amount=fake.pyfloat(left_digits=2, right_digits=2, positive=True, min_value=10, max_value=100),
        payer_id=3,
        expense_date=date.fromisoformat(fake.date()),
        split_method="even",
        is_settled=True,
        settled_date=date.fromisoformat(fake.date()),
    )
    expense4 = Expense(
        description=fake.sentence(),
        amount=round(random.uniform(33.33, 66.66), 2),
        payer_id=1,
        expense_date=date.fromisoformat(fake.date()),
        split_method="even",
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
