from app.models import db, User, environment, SCHEMA, Expense, ExpenseUser
from sqlalchemy.sql import text


def seed_expense_users():
    # user 1 paid expense 1 (33.33 in total) and split among user 1,2,3
    expense_user_1 = ExpenseUser(
        expense_id = 1,
        ower_id = 2,
        amount_to_pay = 11.11,
    )
    expense_user_2 = ExpenseUser(
        expense_id = 1,
        ower_id = 3,
        amount_to_pay = 11.11,
    )
    # user 2 paid expense 2 (66.66 in total) and split among user 1,2
    expense_user_3 = ExpenseUser(
        expense_id = 2,
        ower_id = 1,
        amount_to_pay = 33.33,
    )
    # user 3 paid expense 3 (99.99 in total) and split among user 3,4,5
    expense_user_4 = ExpenseUser(
        expense_id = 3,
        ower_id = 4,
        amount_to_pay = 33.33,
    )
    expense_user_5 = ExpenseUser(
        expense_id = 3,
        ower_id = 5,
        amount_to_pay = 33.33,
    )
    # user 1 paid expense 4 (133.32 in total) and split among user 1,2,3,4
    expense_user_6 = ExpenseUser(
        expense_id = 4,
        ower_id = 2,
        amount_to_pay = 33.33,
    )
    expense_user_7 = ExpenseUser(
        expense_id = 4,
        ower_id = 3,
        amount_to_pay = 33.33,
    )
    expense_user_8 = ExpenseUser(
        expense_id = 4,
        ower_id = 4,
        amount_to_pay = 33.33,
    )

    db.session.add_all([expense_user_1,expense_user_2,expense_user_3, expense_user_4, expense_user_5, expense_user_6, expense_user_7, expense_user_8])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_expense_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.expense_owers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM expense_owers"))

    db.session.commit()
