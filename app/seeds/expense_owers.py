from app.models import db, User, Expense, environment, SCHEMA
from sqlalchemy.sql import text


def seed_expense_owers():
    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)

    expense1 = Expense.query.get(1)
    expense2 = Expense.query.get(2)
    expense3 = Expense.query.get(3)
    expense4 = Expense.query.get(4)

    expense1.owers.append(user2)
    expense1.owers.append(user3)
    expense1.owers.append(user4)

    expense2.owers.append(user1)
    expense2.owers.append(user3)
    expense2.owers.append(user4)

    expense3.owers.append(user5)
    expense3.owers.append(user6)

    expense4.owers.append(user7)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expense_owers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_owers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expense_owers"))

    db.session.commit()
