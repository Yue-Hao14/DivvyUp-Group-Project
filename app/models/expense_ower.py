from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod


# expense_owers = db.Table(
#     "expense_owers",

#     db.Column("expense_id", db.Integer, db.ForeignKey(add_prefix_for_prod("expenses.id")), primary_key=True),
#     db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
# )

# # add SCHEMA to expense_owers table
# if environment == "production":
#     expense_owers.schema = SCHEMA


class ExpenseUser(db.Model):
    __tablename__ = "expense_owers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("expenses.id")), nullable=False)
    ower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    amount_to_pay = db.Column(db.Float, nullable=False)

    owers = db.relationship("User", back_populates="ower_expenses")
    # payer = db.relationship("User", back_populates="payer_expenses")
    expense = db.relationship("Expense", back_populates="expense_users")
