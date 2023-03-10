from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_comments():
    comment1 = Comment(
        user_id=1,
        expense_id=1,
        comment=fake.sentence(),
    )
    comment2 = Comment(
        user_id=2,
        expense_id=2,
        comment=fake.sentence(),
    )
    comment3 = Comment(
        user_id=1,
        expense_id=2,
        comment=fake.sentence(),
    )
    comment4 = Comment(
        user_id=3,
        expense_id=3,
        comment=fake.sentence(),
    )
    comment5 = Comment(
        user_id=2,
        expense_id=3,
        comment=fake.sentence(),
    )

    db.session.add_all([comment1, comment2, comment3, comment4, comment5])
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
