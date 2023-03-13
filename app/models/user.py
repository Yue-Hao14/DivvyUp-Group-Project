from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .expense_ower import expense_owers


user_friends = db.Table(
    "user_friends",
    db.Column("user", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("friend", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
)
# add SCHEMA to user_friends table
if environment == "production":
    user_friends.schema = SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    payer_expenses = db.relationship("Expense", back_populates="payer")
    owed_expenses = db.relationship("Expense", secondary=expense_owers, back_populates="owers")
    settled_expenses = db.relationship("SettledUserExpense", back_populates="settled_user")
    friends = db.relationship('User',
                              secondary=user_friends,
                              primaryjoin=user_friends.c.user==id,
                              secondaryjoin=user_friends.c.friend==id,
                            )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            "firstName": self.first_name,
            "lastName": self.last_name,
            'email': self.email
        }

    def to_dict_id_name(self):
        return {
            'id': self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
        }
