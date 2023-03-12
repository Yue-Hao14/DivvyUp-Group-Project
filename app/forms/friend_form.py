from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def email_exists(form, field):
    # Checking if username is already in use
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('User does not exist.')

# TODO: ADD VALIDATION TO MAKE SURE THE USER BEING ADDED IS NOT ALREADY FRIENDED
# FRONT END SHOULD VALIDATE THAT THE CURRENT USER IS NOT TYRING TO ADD THEMSELVES
class FriendForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), email_exists])
