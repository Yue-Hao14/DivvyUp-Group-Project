from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError
from app.models import Expense

# FRONT END NEEDS TO GET LIST OF FRIENDS TO POPULATE THE FRIEND'S DROPDOWN LIST
# FRONT END NEEDS TO SEND TO BACK END ALL OWERS IN AN ARRAY/LIST,
# THEN BACKEND CAN CONVERT IT TO A STRING

class ExpenseForm(FlaskForm):
    owerIds = StringField("Owers", validators=[DataRequired("Must be at least one other person for an Expense")])
    description = StringField("Description", validators=[DataRequired("Description Required")])
    amount = FloatField("Amount", validators=[DataRequired("Amount Required")])
    expenseDate = DateField("Expense Date", validators=[DataRequired("Expense Date Required")])
