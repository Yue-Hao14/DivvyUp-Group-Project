from app.models import db, User, environment, SCHEMA, Expense
from sqlalchemy.sql import text


def seed_expense_owers():
    demo = User.query.filter_by(username='Demo').first()
    john = User.query.filter_by(username='JohnSmith').first()
    jane = User.query.filter_by(username='JaneDoe').first()


    demo_ower_expenses = Expense.query.filter(Expense.payer_id != demo.id).all()
    john_ower_expenses = Expense.query.filter(Expense.payer_id != john.id).all()
    jane_ower_expenses = Expense.query.filter(Expense.payer_id != jane.id).all()


    for expense in demo_ower_expenses:
        # print("------------", expense.id)
        demo.ower_expenses.append(expense)

    for expense in john_ower_expenses:
        john.ower_expenses.append(expense)

    for expense in jane_ower_expenses:
        jane.ower_expenses.append(expense)

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
