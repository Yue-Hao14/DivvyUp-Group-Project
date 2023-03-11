from datetime import date
from .db import db, environment, SCHEMA, add_prefix_for_prod

expense_owers = db.Table(
    "expense_owers",
    db.Column("expense_id", db.Integer, db.ForeignKey(add_prefix_for_prod("expenses.id")), primary_key=True),
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)
