from .db import db, environment, SCHEMA, add_prefix_for_prod

class ExpenseOwer(db.Model):
    __tablename__ = "expense_owers"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    expense_id = db.Column(db.Integer, db.ForeignKey("expenses.id"))
    ower_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    # TODO: add many to many relationships
