from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, FloatField, IntegerField, DateField
from wtforms.validators import DataRequired, ValidationError

class PaymentForm(FlaskForm):
    owerId = StringField("Owers", validators=[DataRequired("Ower Id Required")])
    expenseId = StringField("Expense", validators=[DataRequired("Expense Id Required")])
    settledDate = DateField("Settled Date", validators=[DataRequired("Settled Date Required")])
