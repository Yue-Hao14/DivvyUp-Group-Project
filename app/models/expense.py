from datetime import date
from .expense_ower import expense_owers
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
    created_at = db.Column(db.Date, nullable=False, default=date.today())
    updated_at = db.Column(db.Date, nullable=False, default=date.today())

    comments = db.relationship("Comment", back_populates="expense", cascade="all, delete-orphan")
    payer = db.relationship("User", back_populates="payer_expenses")
    owers = db.relationship("User", secondary=expense_owers, back_populates="owed_expenses")
    settled_owers = db.relationship("SettledUserExpense", back_populates="expense")



    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "payer": self.payer.to_dict_id_name(),
            "owers": [ower.to_dict_id_name() for ower in self.owers],
            "settledOwers": [settled_ower.to_dict() for settled_ower in self.settled_owers],
            "expenseDate": self.expense_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "comments": [comment.to_dict() for comment in self.comments],
        }

    def to_dict_wo_payer(self):
        return {
            "id": self.id,
            "description": self.description,
            "amount": self.amount,
            "owers": [ower.to_dict_id_name() for ower in self.owers],
            "expenseDate": self.expense_date,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }

    def to_dict_summary(self):
        return {
            "id": self.id,
            "description": self.description,
            "payer": self.payer.to_dict_id_name(),
            "owers": [ower.to_dict_id_name() for ower in self.owers],
            "settledOwers": [settled_ower.to_dict() for settled_ower in self.settled_owers],
            "amount": self.amount,
            "expenseDate": self.expense_date,
        }

    def to_dict_payer_summary(self):
        return {
            "id": self.id,
            "description": self.description,
            "owers": [ower.to_dict_id_name() for ower in self.owers],
            "settledOwers": [settled_ower.to_dict() for settled_ower in self.settled_owers],
            "amount": self.amount,
            "expenseDate": self.expense_date,
        }

    def to_dict_ower_summary(self):
        return {
            "id": self.id,
            "description": self.description,
            "payer": self.payer.to_dict_id_name(),
            "amount": self.amount,
            "expenseDate": self.expense_date,
        }





    # TO DO: add another to_dict method to include limited info needed for transaction history
