from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import date

class SettledUserExpense(db.Model):
    __tablename__ = 'settled_user_expenses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("expenses.id")), nullable=False)
    settled_date = db.Column(db.Date, nullable=False, default=date.today())

    expense = db.relationship("Expense", back_populates="settled_owers")
    settled_user = db.relationship("User", back_populates="settled_expenses")

    def to_dict(self):
        settle_users = [user.to_dict_id_name() for user in [self.settled_user]]

        return {
            "expenseId": self.expense_id,
            "settledDate": self.settled_date,
            "settledUser": [*settle_users]
        }

    def to_dict_wo_user(self):
        return {
            "expenseId": self.expense_id,
            "settledDate": self.settled_date
        }
