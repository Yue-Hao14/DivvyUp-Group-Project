from app.models import db, SettledUserExpense, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_settled_user_expenses():
    settled_expense1 = SettledUserExpense(
        user_id = 3,
        expense_id = 1,
        settled_date = date(2023, 3, 1),
    )
    settled_expense2 = SettledUserExpense(
        user_id = 4,
        expense_id = 2,
        settled_date = date(2023, 2, 14),
    )
    settled_expense3 = SettledUserExpense(
        user_id = 1,
        expense_id = 2,
    )
    settled_expense4 = SettledUserExpense(
        user_id = 5,
        expense_id = 3,
        settled_date = date(2023, 3, 10),
    )
    settled_expense5 = SettledUserExpense(
        user_id = 7,
        expense_id = 4,
    )

    db.session.add_all([settled_expense1, settled_expense2, settled_expense3, settled_expense4, settled_expense5])
    db.session.commit()


def undo_settled_user_expenses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.settled_user_expenses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM settled_user_expenses"))

    db.session.commit()
