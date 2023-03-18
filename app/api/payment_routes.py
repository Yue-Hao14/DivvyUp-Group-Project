from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Expense, User, SettledUserExpense
from app.forms.payment_form import PaymentForm
from .auth_routes import validation_errors_to_error_messages
from datetime import date

payment_routes = Blueprint('payments', __name__)

@payment_routes.route('/', methods=['POST'])
@login_required
def create_a_new_payment():
    """
    validate a new payment via WTForms,
    create a new settled expense in db,
    and return the new settled expense's details
    """
    data = request.get_json()
    expenseId = data['expenseId']
    owerId = data['owerId']
    ower = User.query.get(owerId)
    form = PaymentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # check if this expense exists in db
    expense = Expense.query.get(expenseId)
    # print("expense.settled_owers-----------------------------------", expense.settled_owers[0].to_dict())
    # print("ower-------------------------------------------", ower.to_dict())

    # extract settled_users into a list from expenses to settled_user_expenses back to users table
    settled_users_list=[settled_ower.settled_user for settled_ower in expense.settled_owers]
    # print("boolean -------------------------------------------", ower in settled_users_list)

    if not expense:
        return {'errors': ['Expense does not exist']}, 404
    elif form.validate_on_submit():
        # only payer can settle with each ower
        if current_user.id != expense.payer_id:
            return {'errors': ['Unauthorized to settle this expense']}, 401
        # cannot settle any more if ower already in settled table
        elif ower in settled_users_list:
            return {'errors': ['No more settlement needed']}, 401
        else:
            new_payment = SettledUserExpense(
              user_id = owerId,
              expense_id = expenseId,
              settled_date = date.fromisoformat(data['settledDate']),
            )
            db.session.add(new_payment)
            db.session.commit()

            return new_payment.to_dict(), 201
    else:
        # return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
