from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Username Required"), username_exists])
    firstName = StringField(
        'First Name', validators=[DataRequired("First Name Required")])
    lastName = StringField(
        'Last Name', validators=[DataRequired("Last Name Required")])
    email = StringField('email', validators=[DataRequired("Email Required"), user_exists])
    password = StringField('password', validators=[DataRequired("Password Required")])
