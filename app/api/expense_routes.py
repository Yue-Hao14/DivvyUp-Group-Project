from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Expense
from app.forms.expense_form import ExpenseForm
from .auth_routes import validation_errors_to_error_messages

expense_routes = Blueprint('expenses', __name__)


@expense_routes.route('/')
@login_required
def get_all_current_user_expenses():
  """
  return current users' all settled and pending expenses
  """
  payer_expenses = current_user.payer_expenses
  owed_expenses = current_user.owed_expenses
  settled_expenses = current_user.settled_expenses

  return {'expenses':
            {
              "payerExpenses": [expense.to_dict_wo_payer() for expense in payer_expenses],
              "owerExpenses": [expense.to_dict() for expense in owed_expenses],
              "settledExpenses": [expense.to_dict() for expense in settled_expenses]
            }
          }


@expense_routes.route('/<int:id>')
@login_required
def get_single_expense_details(id):
  """
  return the details of a single expense
  """
  expense = Expense.query.get(id)
  
  return expense.to_dict()


# @expense_routes.route('/', methods=['POST'])
# @login_required
# def create_a_new_expense():
#   """
#   validate a new expense via WTForms, create a new expense in db
#   and return the new expense's detail
#   """
#   data = request.get_json()
#   form = ExpenseForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     new_expense = Expense(
#       description = data["description"],
#       amount = data["amount"],
#       payer_id = data["payerId"],
#       expense_date = data["expenseDate"],
#       split_method = data["splitMethod"],
#       amount = data["amount"],
#     )
#     db.session.add(new_expense)
#     db.session.commit()

#   # we need to send the ower array from front-end to expense_owers table
#     # get owerIds from front end as an array/list
#     ower_ids_list = data["owerIds"]

#     # get the last entry in the expenses table in db
#     new_expense = Expense.query.order_by(Expense.id.desc()).first()

#     # get the ower from users table
#     # append the new_expense as ower_expense to the ower in the users table
