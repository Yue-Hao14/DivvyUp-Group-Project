from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

user_friends = db.Table(
    "user_friends",
    db.Column("user", db.Integer, db.ForeignKey("users.id"), primary_key=True),
    db.Column("friend", db.Integer, db.ForeignKey("users.id"), primary_key=True),
)

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

    expenses = db.relationship("Expense", back_populates="payer")
    friends = db.relationship('User',
                              secondary=user_friends,
                              primaryjoin=user_friends.c.user==id,
                              secondaryjoin=user_friends.c.friend==id,
                              backref='friend_of')

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
            "first_name": self.first_name,
            "last_name": self.last_name,
            'email': self.email
        }
