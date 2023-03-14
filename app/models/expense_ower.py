from .db import db, add_prefix_for_prod, SCHEMA, environment

expense_owers = db.Table(
    "expense_owers",
    db.Column(
        "expense_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("expenses.id"), ondelete="CASCADE"),
        primary_key=True
    ),
    db.Column(
        "ower_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        primary_key=True
    )
)

if environment == "production":
    expense_owers.schema = SCHEMA
