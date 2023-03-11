from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('User does not exist.')

# FRONT END SHOULD VALIDATE THAT THE CURRENT USER IS NOT TYRING TO ADD THEMSELVES
class FriendForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), username_exists])
