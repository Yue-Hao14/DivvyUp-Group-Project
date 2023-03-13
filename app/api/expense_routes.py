from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Expense, User
from app.forms.expense_form import ExpenseForm
from .auth_routes import validation_errors_to_error_messages
from datetime import date

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


@expense_routes.route('/', methods=['POST'])
@login_required
def create_a_new_expense():
    """
    validate a new expense via WTForms, create a new expense in db
    and return the new expense's detail
    """
    data = request.get_json()
    form = ExpenseForm()
    ower_ids = data['owerIds']
    form['csrf_token'].data = request.cookies['csrf_token']
    # Validate that the current user is not in the list of owers
    if current_user.id in ower_ids:
        return {"errors": ["Current User cannot be in ower's list"]}

    if form.validate_on_submit():
        new_expense = Expense(
            description=data['description'],
            amount=data['amount'],
            payer_id=current_user.id,
            expense_date=date.fromisoformat(data['expenseDate']),
        )
        db.session.add(new_expense)
        db.session.commit()

        # print("ower_id-----------------------------------------------------", ower_ids)

        for id in ower_ids:
            # print("id------------------------------------------------------", id)
            user = User.query.get(id)
            new_expense.owers.append(user)

        db.session.commit()
        return new_expense.to_dict()
    else:
        # return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@expense_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_an_expense(id):
    """
    validate expense via WTForms, and return the updated expense's detail
    also make sure only payer can update expense only if no settled expense yet
    """

    data = request.get_json()
    form = ExpenseForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    expense = Expense.query.get(id)
    if not expense:
        return {'errors': 'Expense does not exist'}, 404
    elif form.validate_on_submit():
        ower_ids = data['owerIds']
        print("ower_ids =============================================================================================", ower_ids)

        if current_user.id != expense.payer_id:
            return {'errors': 'Unauthorized to update this expense'}, 401
        elif len(expense.settled_owers) > 0:
            return {'errors': 'Cannot update an expense when one or more user has settled their expenses'}
        else:
            expense.description = form.data["description"]
            expense.amount = form.data['amount']
            expense.expense_date= form.data['expenseDate']


            # cast current list of owers to a set
            # cast new owers list to a set
            # compare the two
            # remove anyone who is in the current list but not the new list
            # add anyone who is in the new list but not the current list
            new_owers = set([User.query.get(id) for id in ower_ids])
            current_owers = set(expense.owers)

            users_to_be_removed = current_owers - new_owers # remove users who are in current expense.owers but not in new_owers
            users_to_be_added = new_owers - current_owers # add users who are in new_owers but not in expense.owers

            for user in list(users_to_be_removed):
                expense.owers.remove(user)

            for user in list(users_to_be_added):
                expense.owers.append(user)

            db.session.commit()

            return expense.to_dict()
    else:
        # return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
