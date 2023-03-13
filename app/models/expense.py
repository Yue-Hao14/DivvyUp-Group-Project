from datetime import date
from .expense_ower import ExpenseUser
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Expense(db.Model):
    __tablename__ = "expenses"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    expense_date = db.Column(db.Date, nullable=False)
    split_method = db.Column(db.String, nullable=False)
    is_settled = db.Column(db.Boolean, nullable=False, default=False)
    settled_date = db.Column(db.Date)
    created_at = db.Column(db.Date, nullable=False, default=date.today())
    updated_at = db.Column(db.Date, nullable=False, default=date.today())

    comments = db.relationship("Comment", back_populates="expense", cascade="all, delete-orphan")
    payer = db.relationship("User", back_populates="payer_expenses")
    # owers = db.relationship("User", secondary=expense_owers, back_populates="ower_expenses")
    expense_users = db.relationship("ExpenseUser", back_populates="expense")

    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "payer_id": self.payer_id,
            "expense_date": self.expense_date,
            "split_method": self.split_method,
            "is_settled": self.is_settled,
            "settled_date": self.settled_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    # TO DO: add another to_dict method to include limited info needed for transaction history
