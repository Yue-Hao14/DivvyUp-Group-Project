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
        friend = User.query.filter(User.username == form.data["username"]).first()
        current_user.friends.append(friend)
        friend.friends.append(current_user)
        db.session.commit()
        return [friend.to_dict() for friend in current_user.friends]
    else:
        # return error
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
