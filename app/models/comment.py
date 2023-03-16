from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    expense_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("expenses.id")), nullable=False)
    comment = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.Date, nullable=False, default=date.today())
    updated_at = db.Column(db.Date, nullable=False, default=date.today())

    user = db.relationship("User")
    expense = db.relationship("Expense", back_populates="comments")

    def to_dict(self):
        return {
            "id": self.id,
            "user": self.user.to_dict_id_name,
            "expenseId": self.expense_id,
            "comment": self.comment,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at
        }
