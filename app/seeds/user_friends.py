from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_friends():
    demo = User.query.filter_by(username='Demo').first()
    john = User.query.filter_by(username='JohnSmith').first()
    jane = User.query.filter_by(username='JaneDoe').first()

    demo.friends.append(john)
    demo.friends.append(jane)
    john.friends.append(demo)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_friends():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_friends RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_friends"))

    db.session.commit()
