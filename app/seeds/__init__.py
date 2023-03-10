from flask.cli import AppGroup
from app.models import Expense, Comment, db
from .users import seed_users, undo_users
from .expenses import seed_expenses, undo_expenses
from .comments import seed_comments, undo_comments
from .user_friends import seed_friends, undo_friends
from .expense_owers import seed_expense_owers, undo_expense_owers
from .settled_user_expenses import seed_settled_user_expenses, undo_settled_user_expenses

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_friends()
        undo_comments()
        undo_settled_user_expenses()
        undo_expense_owers()
        undo_expenses()
        undo_users()
    seed_users()
    seed_expenses()
    seed_expense_owers()
    seed_settled_user_expenses()
    seed_comments()
    seed_friends()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_friends()
    undo_comments()
    undo_settled_user_expenses()
    undo_expense_owers()
    undo_expenses()
    undo_users()
    # Add other undo functions here
