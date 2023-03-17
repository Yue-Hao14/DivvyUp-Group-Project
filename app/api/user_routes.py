from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User
from app.forms.friend_form import FriendForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/friends')
@login_required
def get_current_users_friends():
    """
    Return list of all current user's friends
    """
    friends = current_user.friends
    return [friend.to_dict() for friend in friends]


@user_routes.route('/friends', methods=["POST"])
@login_required
def add_a_friend():
    """
    Add friend to current user's friends list, and update
    other user's friend list to include current user
    """
    form = FriendForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        friend = User.query.filter(User.email == form.data["email"]).first()
        if friend.id == current_user.id:
            return { "errors": ["Cannot friend self"] }, 401
        current_user.friends.append(friend)
        friend.friends.append(current_user)
        db.session.commit()
        return friend.to_dict(), 201
    else:
        # return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@user_routes.route('/friends/<int:id>/expenses')
@login_required
def get_friend_expenses(id):
    """
    Get a list of expense summaries between the current user and the friend by friend id
    """
    friend = User.query.get(id)

    if friend not in current_user.friends:
        return { "errors": ["Cannot view expenses of a user who is not a friend of current user"] }, 401

    friend_ower_expenses = [expense for expense in friend.owed_expenses]
    friend_payer_expenses = [expense for expense in friend.payer_expenses]
    current_user_ower_expenses = [expense for expense in current_user.owed_expenses]
    current_user_payer_expenses = [expense for expense in current_user.payer_expenses]

    # current user payer expenses where friend is ower
    current_user_payer_expenses_to_return = set(current_user_payer_expenses).intersection(set(friend_ower_expenses))
    # current user ower expenses where friend is payer
    current_user_ower_expenses_to_return = set(current_user_ower_expenses).intersection(set(friend_payer_expenses))

    expenses_to_return = [*current_user_payer_expenses_to_return, *current_user_ower_expenses_to_return]

    # NICK MADE A NEW TO_DICT METHOD ON THE EXPENSE MODEL, HE REALLY NEEDS TO COMMENT HIS CODE BETTER
    return [expense.to_dict_summary() for expense in expenses_to_return]


@user_routes.route('/friends/<int:id>', methods=["DELETE"])
@login_required
def remove_friend(id):
    """
    Remove a friend from current user's friends list, and update
    the other user's friends list to remove current user
    """
    friend = User.query.get(id)
    if not friend:
        return { "errors": ["Cannot find user"]}, 404
    elif friend not in current_user.friends:
        return { 'errors': ['Cannot remove friend who is not in friends list'] }, 401
    current_user.friends.remove(friend)
    friend.friends.remove(current_user)
    db.session.commit()
    return { "message": "successfuly removed" }, 200
